import { Component, Input, OnInit } from "@angular/core";
import { IBookListItem } from "src/app/core/types/catalog.contracts";

@Component({
  selector: "bw-book-list-item",
  templateUrl: "./book-list-item.component.html",
  styleUrls: ["./book-list-item.component.scss"]
})
export class BookListItemComponent implements OnInit {
  @Input() book: IBookListItem;

  constructor() {}

  ngOnInit() {}
}
