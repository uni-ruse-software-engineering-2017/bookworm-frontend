import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IBookListItem } from "src/app/core/types/catalog";

@Component({
  selector: "bw-book-list-item",
  templateUrl: "./book-list-item.component.html",
  styleUrls: ["./book-list-item.component.scss"]
})
export class BookListItemComponent implements OnInit {
  @Input() book: IBookListItem;
  @Input() canAddToCart = true;
  @Input() isOwned = false;
  @Input() isAdmin = false;

  @Output() buyPressed = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onBuyPressed() {
    this.buyPressed.emit();
  }
}
