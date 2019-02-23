import { Component, Input, OnInit } from "@angular/core";
import { IAuthorListItem } from "src/app/core/types/catalog";

@Component({
  selector: "bw-authors-management-list",
  templateUrl: "./authors-management-list.component.html",
  styleUrls: ["./authors-management-list.component.scss"]
})
export class AuthorsManagementListComponent implements OnInit {
  @Input() authors: IAuthorListItem[] = [];

  constructor() {}

  ngOnInit() {}
}
