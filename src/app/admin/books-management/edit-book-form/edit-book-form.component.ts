import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { forkJoin, Observable, of, throwError } from "rxjs";
import { flatMap, map, startWith } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { BookService } from "src/app/core/services/book.service";
import { CategoryService } from "src/app/core/services/category.service";
import {
  IAuthorListItem,
  IBookDetailed,
  IBookFile,
  ICategory
} from "src/app/core/types/catalog";
import { FileUploadComponent } from "src/app/shared/file-upload/file-upload.component";
import { toggleFormDisabledState } from "src/app/util/ng";
import { environment } from "src/environments/environment";

@Component({
  selector: "bw-edit-book-form",
  templateUrl: "./edit-book-form.component.html",
  styleUrls: ["./edit-book-form.component.scss"]
})
export class EditBookFormComponent implements OnInit {
  form: FormGroup;
  authors: IAuthorListItem[] = [];
  categories: ICategory[] = [];
  FILES_URL = `${environment.host}/files/`;
  filteredAuthors: Observable<IAuthorListItem[]> = of([]);
  filteredCategories: Observable<ICategory[]> = of([]);
  book: IBookDetailed;
  bookFiles: IBookFile[] = [];
  bookId: string;

  files: Set<File> = new Set();
  uploadProgress: { [key: string]: { progress: Observable<number> } } = null;

  @ViewChild(FileUploadComponent) fileUploadInput: FileUploadComponent;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this.initializeForm();
  }

  ngOnInit() {
    this.initializeForm();

    forkJoin(this.getAllAuthors(), this.getAllCategories()).subscribe(
      ([authors, categories]) => {
        this.authors = authors;
        this.categories = categories;
      }
    );

    this.fetchBook();

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

  deleteFile(file: IBookFile) {}

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData: IBookDetailed = this.form.value;

    const bookData: Partial<IBookDetailed> = {
      ...formData,
      authorId: formData.author.id,
      categoryId: formData.category.id
    };

    toggleFormDisabledState(this.form, true);
    return this.bookService.edit(this.bookId, bookData).subscribe(
      updatedBook => {
        this.snackbar.open(`${formData.title} was saved.`, null, {
          duration: 3500
        });

        this.fetchBook();

        // skip uploading
        if (this.files.size === 0) {
          return;
        }

        toggleFormDisabledState(this.form, true);

        this.uploadProgress = this.bookService.uploadBookFiles(
          updatedBook.id,
          this.files
        );

        const allProgressObservables = Object.keys(this.uploadProgress).map(
          key => this.uploadProgress[key].progress
        );

        forkJoin(allProgressObservables).subscribe(
          end => {
            toggleFormDisabledState(this.form, false);

            this.snackbar.open(
              `${this.files.size} files were uploaded successfully.`,
              null,
              {
                duration: 3500
              }
            );

            this.fileUploadInput.clearFiles();
            this.uploadProgress = null;
            this.fetchBook();
          },
          error => {
            toggleFormDisabledState(this.form, false);
            return throwError(error);
          }
        );
      },
      error => {
        toggleFormDisabledState(this.form, false);
        return throwError(error);
      }
    );
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

  private fetchBook() {
    this.route.paramMap
      .pipe(
        flatMap((params: ParamMap) => {
          const bookId = params.get("bookId");
          this.bookId = bookId;

          return forkJoin(
            this.bookService.getById(bookId),
            this.bookService.getBookFiles(bookId)
          );
        })
      )
      .subscribe(([book, bookFiles]) => {
        this.book = book;
        this.bookFiles = bookFiles;

        const formData: IBookFormData = {
          author: book.author,
          available: book.available,
          category: book.category,
          coverImage: book.coverImage,
          datePublished: book.datePublished,
          featured: book.featured,
          freeDownload: book.freeDownload,
          isbn: book.isbn,
          pages: book.pages,
          price: book.price,
          summary: book.summary,
          title: book.title
        };

        this.form.setValue(formData);
      });
  }

  private initializeForm() {
    const formDef: IBookFormData = {
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
      available: [false],
      featured: [false],
      author: [null, [Validators.required]],
      category: [null, [Validators.required]]
    };

    return this.fb.group(formDef);
  }
}

interface IBookFormData {
  title: any;
  isbn: any;
  pages: any;
  summary: any;
  datePublished: any;
  price: any;
  coverImage: any;
  freeDownload: any;
  available: any;
  featured: any;
  author: any;
  category: any;
}
