import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IAuthorListItem } from "src/app/core/types/catalog";

@Component({
  selector: "bw-authors-management-list",
  templateUrl: "./authors-management-list.component.html",
  styleUrls: ["./authors-management-list.component.scss"]
})
export class AuthorsManagementListComponent implements OnInit {
  @Input() authors: IAuthorListItem[] = [];
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  editClicked(authorId: string) {
    this.editClick.emit(authorId);
  }

  deleteClicked(authorId: string) {
    this.deleteClick.emit(authorId);
  }
}
