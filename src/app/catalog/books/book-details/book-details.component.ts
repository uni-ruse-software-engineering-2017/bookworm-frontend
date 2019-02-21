import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { flatMap } from "rxjs/operators";
import { BookService } from "src/app/core/services/book.service";
import { ShoppingCartService } from "src/app/core/services/shopping-cart.service";
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
    private bookService: BookService,
    private cartService: ShoppingCartService,
    public snacks: MatSnackBar,
    public router: Router
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
