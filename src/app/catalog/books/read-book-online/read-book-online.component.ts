import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { filter, flatMap } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { AuthorService } from "src/app/core/services/author.service";
import { BookService } from "src/app/core/services/book.service";
import { IBookDetailed, IBookFile } from "src/app/core/types/catalog";
import { environment } from "src/environments/environment";

@Component({
  selector: "bw-read-book-online",
  templateUrl: "./read-book-online.component.html",
  styleUrls: ["./read-book-online.component.scss"]
})
export class ReadBookOnlineComponent implements OnInit {
  book: IBookDetailed;
  canReadBook = false;
  isAdmin = false;
  FILES_URL = `${environment.host}/files/`;
  bookFile: IBookFile;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private auth: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        flatMap((params: ParamMap) => {
          const bookId = params.get("bookId");

          return forkJoin(
            this.bookService.getById(bookId),
            this.bookService.getBookFiles(bookId)
          );
        })
      )
      .subscribe(([book, bookFiles]) => {
        this.book = book;

        this.bookFile = bookFiles.find(
          bf => bf.extension === "epub" && !bf.isPreview
        );

        // check if the book is already bought by the user
        this.auth.user$.pipe(filter(user => !!user)).subscribe(user => {
          this.isAdmin = user.role === "admin";
          this.canReadBook =
            Boolean(
              user.ownedBooks.find(ownedBookId => ownedBookId === book.id)
            ) ||
            this.isAdmin ||
            Boolean(user.subscription);
        });
      });
  }
}
