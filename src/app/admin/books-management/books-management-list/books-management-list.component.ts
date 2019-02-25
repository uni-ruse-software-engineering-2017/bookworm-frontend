import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IBookListItem } from "src/app/core/types/catalog";

@Component({
  selector: "bw-books-management-list",
  templateUrl: "./books-management-list.component.html",
  styleUrls: ["./books-management-list.component.scss"]
})
export class BooksManagementListComponent implements OnInit {
  @Input() books: IBookListItem[] = [];
  @Output() removeBook = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  removeBookClicked(book: IBookListItem) {
    this.removeBook.emit(book);
  }
}
