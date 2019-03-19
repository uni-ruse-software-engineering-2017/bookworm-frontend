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
  books: IPaginatedResource<IBookListItem> = emptyResource();
  hasNextPage: boolean;

  constructor(public bookService: BookService) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(page = 1) {
    this.bookService
      .getAll({ page: page || 1, pageSize: 10 })
      .subscribe(books => {
        this.books = books;
        this.hasNextPage = books.page < books.pageCount;
      });
  }

  loadNext() {
    this.fetchBooks(this.books.page + 1);
  }

  loadPrev() {
    this.fetchBooks(this.books.page - 1);
  }
}
