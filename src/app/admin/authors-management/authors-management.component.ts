import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { filter, flatMap } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { IAuthorListItem } from "src/app/core/types/catalog";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";
import { CreateAuthorFormComponent } from "./create-author-form/create-author-form.component";
import { EditAuthorFormComponent } from "./edit-author-form/edit-author-form.component";

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

  openEditAuthorModal(authorId: string) {
    const modalRef = this.dialog.open(EditAuthorFormComponent, {
      data: authorId
    });

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getAuthors();
      });
  }

  openDeleteAuthorModal(authorId: string) {
    const modalRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete Author",
        message: "Are you sure you want to delete this author?",
        color: "error"
      } as IConfirmationModalComponentData
    });

    return modalRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        flatMap(() => this.authorService.delete(authorId))
      )
      .subscribe(x => {
        this.getAuthors();
      });
  }
}
