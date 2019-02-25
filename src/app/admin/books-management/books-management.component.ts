import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { filter, flatMap } from "rxjs/operators";
import { BookService } from "src/app/core/services/book.service";
import { IPaginatedResource } from "src/app/core/types";
import { IBookListItem } from "src/app/core/types/catalog";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "bw-books-management",
  templateUrl: "./books-management.component.html",
  styleUrls: ["./books-management.component.scss"]
})
export class BooksManagementComponent implements OnInit {
  books: IPaginatedResource<IBookListItem>;
  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService
      .getAll()
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
}
