import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { forkJoin } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { BookService } from "src/app/core/services/book.service";
import { CategoryService } from "src/app/core/services/category.service";
import { IPaginatedResource } from "src/app/core/types";
import { IBookListItem, ICategory } from "src/app/core/types/catalog";

@Component({
  selector: "bw-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"]
})
export class CategoryDetailsComponent implements OnInit {
  category: ICategory;
  books: IPaginatedResource<IBookListItem>;

  constructor(
    private categoryService: CategoryService,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        flatMap((params: ParamMap) => {
          const categoryId = params.get("categoryId");

          return forkJoin(
            this.categoryService
              .getById(categoryId)
              .pipe(map(category => (this.category = category))),
            this.bookService
              .getAll({ categoryId })
              .pipe(map(books => (this.books = books)))
          );
        })
      )
      .subscribe();
  }
}
