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
import { BookService } from "src/app/core/services/book.service";
import { IPaginatedResource } from "src/app/core/types";
import { IBookListItem } from "src/app/core/types/catalog";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";
import { emptyResource, IPaginationQuery } from "src/app/util/pagination";

@Component({
  selector: "bw-books-management",
  templateUrl: "./books-management.component.html",
  styleUrls: ["./books-management.component.scss"]
})
export class BooksManagementComponent implements OnInit {
  books: IPaginatedResource<IBookListItem> = emptyResource();
  searchToggled = false;
  searchInput = new FormControl();

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getBooks();

    this.searchInput.valueChanges
      .pipe(
        startWith(""),
        debounceTime(600),
        filter((sn: string) => sn && sn.length >= 2),
        distinctUntilChanged(),
        map((searchString: string) =>
          this.getBooks({ page: 1, pageSize: 10, search: searchString })
        )
      )
      .subscribe();

    // if an user deletes the search string,
    // load the initial list of books
    this.searchInput.valueChanges.subscribe((val: string) => {
      if (val !== "") {
        return;
      }

      this.getBooks();
    });
  }

  getBooks(query?: IPaginationQuery) {
    this.bookService
      .getAll(query)
      .subscribe(booksResponse => (this.books = booksResponse));
  }

  openConfirmDeleteModal(book: IBookListItem) {
    const modalRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete Book",
        message: "Are you sure you want to delete this book?",
        color: "error"
      } as IConfirmationModalComponentData
    });

    return modalRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        flatMap(() => this.bookService.delete(book.id))
      )
      .subscribe(x => {
        this.getBooks();
      });
  }

  onPaginate(event: PageEvent) {
    this.getBooks({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }

  toggleSearch(state: boolean) {
    this.searchToggled = state;

    if (!state) {
      this.searchInput.setValue("");
    }
  }
}
