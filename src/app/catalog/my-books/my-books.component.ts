import { Component, OnInit } from "@angular/core";
import { BookService } from "src/app/core/services/book.service";
import { IPaginatedResource } from "src/app/core/types";
import { IBookListItem } from "src/app/core/types/catalog";
import { emptyResource } from "src/app/util/pagination";

@Component({
  selector: "bw-my-books",
  templateUrl: "./my-books.component.html",
  styleUrls: ["./my-books.component.scss"]
})
export class MyBooksComponent implements OnInit {
  purchasedBooks: IPaginatedResource<IBookListItem> = emptyResource();
  availableOnline: IPaginatedResource<IBookListItem> = emptyResource();

  constructor(public bookService: BookService) {}

  ngOnInit() {
    this.fetchPurchasedBooks();
    this.fetchOnlineBooks();
  }

  fetchPurchasedBooks(page = 1) {
    this.bookService.getUserBooks({ page: page || 1 }).subscribe(books => {
      this.purchasedBooks = books;
    });
  }

  fetchOnlineBooks(page = 1) {
    this.bookService.getUserBooksForOnlineReading({ page }).subscribe(books => {
      this.availableOnline = books;
    });
  }

  loadNextOnline() {
    this.fetchOnlineBooks(this.availableOnline.page + 1);
  }

  loadPrevOnline() {
    this.fetchOnlineBooks(this.availableOnline.page - 1);
  }

  loadNextPurchased() {
    this.fetchPurchasedBooks(this.purchasedBooks.page + 1);
  }

  loadPrevPurchased() {
    this.fetchPurchasedBooks(this.purchasedBooks.page - 1);
  }
}
