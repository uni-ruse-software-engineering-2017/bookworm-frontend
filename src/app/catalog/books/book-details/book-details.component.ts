import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { flatMap } from "rxjs/operators";
import { BookService } from "src/app/core/services/book.service";
import { IBookDetailed } from "src/app/core/types/catalog";

@Component({
  selector: "bw-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"]
})
export class BookDetailsComponent implements OnInit {
  book: IBookDetailed;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        flatMap((params: ParamMap) => {
          const bookId = params.get("bookId");

          return this.bookService.getById(bookId);
        })
      )
      .subscribe(book => {
        this.book = book;
      });
  }
}
