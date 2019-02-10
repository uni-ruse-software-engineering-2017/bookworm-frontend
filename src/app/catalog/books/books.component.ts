import { Component, OnInit } from "@angular/core";
import { BookService } from "src/app/core/services/book.service";
import { IBookListItem } from "src/app/core/types/catalog.contracts";

@Component({
  selector: "bw-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  books: IBookListItem[];

  constructor(public bookService: BookService) {}

  ngOnInit() {
    this.bookService.getAll().subscribe(books => {
      this.books = books.items;
    });
  }
}
