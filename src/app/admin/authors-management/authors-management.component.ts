import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, PageEvent } from "@angular/material";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  flatMap,
  map,
  startWith
} from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { IPaginatedResource } from "src/app/core/types";
import { IAuthorListItem } from "src/app/core/types/catalog";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";
import { emptyResource, IPaginationQuery } from "src/app/util/pagination";
import { CreateAuthorFormComponent } from "./create-author-form/create-author-form.component";
import { EditAuthorFormComponent } from "./edit-author-form/edit-author-form.component";

@Component({
  selector: "bw-authors-management",
  templateUrl: "./authors-management.component.html",
  styleUrls: ["./authors-management.component.scss"]
})
export class AuthorsManagementComponent implements OnInit {
  authors: IPaginatedResource<IAuthorListItem> = emptyResource();
  searchToggled = false;
  searchInput = new FormControl();

  constructor(public authorService: AuthorService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAuthors();

    this.searchInput.valueChanges
      .pipe(
        startWith(""),
        debounceTime(600),
        filter((sn: string) => sn && sn.length >= 2),
        distinctUntilChanged(),
        map((searchString: string) =>
          this.getAuthors({ page: 1, pageSize: 10, search: searchString })
        )
      )
      .subscribe();

    // if an user deletes the search string,
    // load the initial list of authors
    this.searchInput.valueChanges.subscribe((val: string) => {
      if (val !== "") {
        return;
      }

      this.getAuthors();
    });
  }

  getAuthors(query?: IPaginationQuery) {
    this.authorService.getAll(query).subscribe(authors => {
      this.authors = authors;
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

  onPaginate(event: PageEvent) {
    this.getAuthors({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }

  toggleSearch(state: boolean) {
    this.searchToggled = state;

    if (!state) {
      this.searchInput.setValue("");
    }
  }
}
