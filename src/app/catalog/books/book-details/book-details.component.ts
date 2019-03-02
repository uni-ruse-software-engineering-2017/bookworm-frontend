import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { flatMap } from "rxjs/operators";
import { BookService } from "src/app/core/services/book.service";
import { ShoppingCartService } from "src/app/core/services/shopping-cart.service";
import { IBookDetailed, IBookFile } from "src/app/core/types/catalog";

@Component({
  selector: "bw-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"]
})
export class BookDetailsComponent implements OnInit {
  book: IBookDetailed;

  isBookAlreadyAddedInCart = false;
  bookFiles: IBookFile[] = [];
  formats = "";

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
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
        this.formats = bookFiles.map(bf => bf.extension).join(", ");

        // check if the book is already in the cart
        this.cartService.content$.subscribe(cart => {
          this.isBookAlreadyAddedInCart = !!cart.items.find(
            i => i.bookId === this.book.id
          );
        });
      });
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
