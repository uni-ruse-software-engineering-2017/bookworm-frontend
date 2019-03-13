import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { AuthorService } from "src/app/core/services/author.service";
import { BookService } from "src/app/core/services/book.service";
import { ShoppingCartService } from "src/app/core/services/shopping-cart.service";
import { IAuthor, IBookDetailed, IBookFile } from "src/app/core/types/catalog";
import { environment } from "src/environments/environment";

@Component({
  selector: "bw-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"]
})
export class BookDetailsComponent implements OnInit {
  book: IBookDetailed;
  author: IAuthor;
  isBookAlreadyAddedInCart = false;
  isBookAlreadyOwnedByUser = false;
  bookFiles: IBookFile[] = [];
  formats = "";
  FILES_URL = `${environment.host}/files/`;
  preview: IBookFile;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private auth: AuthenticationService,
    public cartService: ShoppingCartService,
    public snacks: MatSnackBar,
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
        this.bookFiles = bookFiles;
        this.preview = bookFiles.find(
          bf => bf.extension === "epub" && bf.isPreview
        );
        this.formats = bookFiles.map(bf => bf.extension).join(", ");

        this.getAuthorDetails(book.author.id);

        // check if the book is already in the cart
        this.cartService.content$.subscribe(cart => {
          this.isBookAlreadyAddedInCart = !!cart.items.find(
            i => i.bookId === this.book.id
          );
        });

        // check if the book is already bought by the user
        this.auth.user$.subscribe(user => {
          this.isBookAlreadyOwnedByUser = !!user.ownedBooks.find(
            ownedBookId => ownedBookId === book.id
          );
        });
      });
  }

  getAuthorDetails(authorId: string) {
    this.authorService
      .getById(authorId)
      .pipe(
        map(author => {
          if (!author.books) {
            return author;
          }

          // remove the current book from the list
          author.books = author.books.filter(book => book.id !== this.book.id);

          return author;
        })
      )
      .subscribe(author => (this.author = author));
  }

  addToCart(book: IBookDetailed) {
    this.cartService.addItem(book.id).subscribe(() => {
      const snack = this.snacks.open(
        `${book.title} was added to your cart.`,
        "View Cart",
        {
          duration: 3500
        }
      );

      snack.onAction().subscribe(() => {
        this.router.navigate(["shopping-cart"]);
      });
    });
  }
}
