import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { filter } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { IAuthorListItem } from "src/app/core/types/catalog";
import { CreateAuthorFormComponent } from "./create-author-form/create-author-form.component";

@Component({
  selector: "bw-authors-management",
  templateUrl: "./authors-management.component.html",
  styleUrls: ["./authors-management.component.scss"]
})
export class AuthorsManagementComponent implements OnInit {
  authors: IAuthorListItem[];

  constructor(public authorService: AuthorService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAll().subscribe(authors => {
      this.authors = authors.items;
    });
  }

  openAddAuthorModal() {
    const modalRef = this.dialog.open(CreateAuthorFormComponent);

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getAuthors();
      });
  }
}
