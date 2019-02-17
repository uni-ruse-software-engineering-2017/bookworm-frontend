import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { BookService } from "src/app/core/services/book.service";
import { ShoppingCartService } from "src/app/core/services/shopping-cart.service";
import { IBookListItem } from "src/app/core/types/catalog";

@Component({
  selector: "bw-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  books: IBookListItem[];

  constructor(
    public bookService: BookService,
    public cartService: ShoppingCartService,
    public snacks: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.bookService.getAll().subscribe(books => {
      this.books = books.items;
    });
  }

  onBuyPressed(book: IBookListItem) {
    this.cartService.addItem(book.id).subscribe(response => {
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
