import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { map } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { IPaginatedResource } from "src/app/core/types";
import { IAuthorListItem } from "src/app/core/types/catalog";
import { emptyResource, IPaginationQuery } from "src/app/util/pagination";
import { searchOperator } from "src/app/util/search.operator";

@Component({
  selector: "bw-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.scss"]
})
export class AuthorsComponent implements OnInit {
  authors: IPaginatedResource<IAuthorListItem> = emptyResource();
  searchToggled = false;
  searchInput = new FormControl();

  constructor(public authorService: AuthorService) {}

  ngOnInit() {
    this.getAuthors();

    this.searchInput.valueChanges
      .pipe(
        searchOperator,
        map(searchString =>
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
