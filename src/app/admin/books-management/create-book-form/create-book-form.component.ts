import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Observable, of } from "rxjs";
import { finalize, map, startWith } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { BookService } from "src/app/core/services/book.service";
import { CategoryService } from "src/app/core/services/category.service";
import { IPaginatedResource } from "src/app/core/types";
import {
  IAuthorListItem,
  IBookDetailed,
  ICategory,
  INewBook
} from "src/app/core/types/catalog";
import { toggleFormDisabledState } from "src/app/util/ng";
import { emptyResource } from "src/app/util/pagination";

@Component({
  selector: "bw-create-book-form",
  templateUrl: "./create-book-form.component.html",
  styleUrls: ["./create-book-form.component.scss"]
})
export class CreateBookFormComponent implements OnInit {
  form: FormGroup;
  authors: IPaginatedResource<IAuthorListItem> = emptyResource();
  categories: IPaginatedResource<ICategory> = emptyResource();

  filteredAuthors: Observable<IAuthorListItem[]> = of([]);
  filteredCategories: Observable<ICategory[]> = of([]);

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ["", [Validators.required]],
      isbn: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]
      ],
      pages: [
        200,
        [Validators.required, Validators.min(1), Validators.max(2000)]
      ],
      summary: [""],
      datePublished: ["", [Validators.required]],
      price: [0.0, [Validators.min(0)]],
      coverImage: ["", [Validators.required]],
      freeDownload: [false],
      available: [true],
      featured: [false],
      author: [null, [Validators.required]],
      category: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.authorService.getAll().subscribe(authors => {
      this.authors = authors;
    });

    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    this.filteredAuthors = this.form.get("author").valueChanges.pipe(
      startWith<string | IAuthorListItem>(""),
      map(value => value || ""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name =>
        name ? this._filterAuthors(name) : this.authors.items.slice()
      )
    );

    this.filteredCategories = this.form.get("category").valueChanges.pipe(
      startWith<string | ICategory>(""),
      map(value => value || ""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name =>
        name ? this._filterCategories(name) : this.categories.items.slice()
      )
    );
  }

  searchByISBN() {
    toggleFormDisabledState(this.form, true);
    this.bookService
      .searchByISBN(this.form.get("isbn").value)
      .pipe(finalize(() => toggleFormDisabledState(this.form, false)))
      .subscribe(result => {
        this.form.setValue({ ...result, author: null, category: null });
      });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData: IBookDetailed = this.form.value;

    const bookData: INewBook = {
      ...formData,
      authorId: formData.author.id,
      categoryId: formData.category.id
    };

    return this.bookService.create(bookData).subscribe(() => {
      this.snackbar.open(`${formData.title} was created.`, null, {
        duration: 3500
      });

      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.form.updateValueAndValidity();
    });
  }

  displayAuthorFn(author?: IAuthorListItem) {
    return author ? author.name : undefined;
  }

  displayCategoryFn(category?: ICategory) {
    return category ? category.name : undefined;
  }

  private _filterAuthors(name: string): IAuthorListItem[] {
    const filterValue = name.toLowerCase();

    if (!this.authors) {
      return [];
    }

    return this.authors.items.filter(
      option => option.name.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  private _filterCategories(name: string): ICategory[] {
    const filterValue = name.toLowerCase();

    if (!this.categories) {
      return [];
    }

    return this.categories.items.filter(
      option => option.name.toLowerCase().indexOf(filterValue) >= 0
    );
  }
}
