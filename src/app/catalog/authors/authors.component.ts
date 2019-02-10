import { Component, OnInit } from "@angular/core";
import { AuthorService } from "src/app/core/services/author.service";
import { IAuthorListItem } from "src/app/core/types/catalog.contracts";

@Component({
  selector: "bw-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.scss"]
})
export class AuthorsComponent implements OnInit {
  authors: IAuthorListItem[];

  constructor(public authorService: AuthorService) {}

  ngOnInit() {
    this.authorService.getAll().subscribe(authors => {
      this.authors = authors.items;
    });
  }
}
