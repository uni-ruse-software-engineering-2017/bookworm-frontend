import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { forkJoin, Observable, of, throwError } from "rxjs";
import { finalize, map, startWith } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { BookService } from "src/app/core/services/book.service";
import { CategoryService } from "src/app/core/services/category.service";
import {
  IAuthorListItem,
  IBookDetailed,
  ICategory,
  INewBook
} from "src/app/core/types/catalog";
import { FileUploadComponent } from "src/app/shared/file-upload/file-upload.component";
import { ValidateISBN } from "src/app/shared/validators/isbn.validator";
import { toggleFormDisabledState } from "src/app/util/ng";

@Component({
  selector: "bw-create-book-form",
  templateUrl: "./create-book-form.component.html",
  styleUrls: ["./create-book-form.component.scss"]
})
export class CreateBookFormComponent implements OnInit {
  form: FormGroup;
  authors: IAuthorListItem[] = [];
  categories: ICategory[] = [];
  fallbackImgUrl =
    "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/book/111x148._SX50_.png";

  filteredAuthors: Observable<IAuthorListItem[]> = of([]);
  filteredCategories: Observable<ICategory[]> = of([]);

  files: Set<File> = new Set();
  uploadProgress: { [key: string]: { progress: Observable<number> } } = null;

  @ViewChild(FileUploadComponent) fileUploadInput: FileUploadComponent;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.initializeForm();
  }

  ngOnInit() {
    this.getAllAuthors().subscribe(authors => (this.authors = authors));
    this.getAllCategories().subscribe(
      categories => (this.categories = categories)
    );

    this.filteredAuthors = this.form.get("author").valueChanges.pipe(
      startWith<string | IAuthorListItem>(""),
      map(value => value || ""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filterAuthors(name) : this.authors.slice()))
    );

    this.filteredCategories = this.form.get("category").valueChanges.pipe(
      startWith<string | ICategory>(""),
      map(value => value || ""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name =>
        name ? this._filterCategories(name) : this.categories.slice()
      )
    );
  }

  searchByISBN() {
    toggleFormDisabledState(this.form, true);
    this.bookService
      .searchByISBN(this.form.get("isbn").value)
      .pipe(finalize(() => toggleFormDisabledState(this.form, false)))
      .subscribe(result => {
        // refresh the authors list
        this.getAllAuthors().subscribe(authors => {
          this.authors = authors;

          const author = result.author
            ? this.authors.find(a => result.author.id === a.id)
            : null;

          this.form.setValue({ ...result, author, category: null });
        });
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

    return this.bookService.create(bookData).subscribe(createdBook => {
      this.snackbar.open(`${formData.title} was created.`, null, {
        duration: 3500
      });

      if (!this.files.size) {
        this.form = this.initializeForm();
        this.fileUploadInput.clearFiles();
        return;
      }

      // upload e-book files
      toggleFormDisabledState(this.form, true);
      this.uploadProgress = this.bookService.uploadBookFiles(
        createdBook.id,
        this.files
      );

      const allProgressObservables = Object.keys(this.uploadProgress).map(
        key => this.uploadProgress[key].progress
      );

      forkJoin(allProgressObservables).subscribe(
        end => {
          toggleFormDisabledState(this.form, false);

          this.form = this.initializeForm();
          this.fileUploadInput.clearFiles();
          this.uploadProgress = null;
        },
        error => {
          toggleFormDisabledState(this.form, false);
          return throwError(error);
        }
      );
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

    return this.authors.filter(
      option => option.name.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  private _filterCategories(name: string): ICategory[] {
    const filterValue = name.toLowerCase();

    if (!this.categories) {
      return [];
    }

    return this.categories.filter(
      option => option.name.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  private getAllAuthors() {
    return this.authorService.getAll({ pageSize: -1, page: 1 }).pipe(
      map(response => {
        return response.items;
      })
    );
  }

  private getAllCategories() {
    return this.categoryService.getAll({ pageSize: -1, page: 1 }).pipe(
      map(response => {
        return response.items;
      })
    );
  }

  onFilesChanged(files: Set<File>) {
    this.files = files;
  }

  private initializeForm() {
    return this.fb.group({
      title: ["", [Validators.required]],
      isbn: ["", [Validators.required, ValidateISBN]],
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
}
