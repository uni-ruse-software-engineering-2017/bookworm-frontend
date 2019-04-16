import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { BookService } from "src/app/core/services/book.service";
import { CategoryService } from "src/app/core/services/category.service";
import { ShoppingCartService } from "src/app/core/services/shopping-cart.service";
import { IPaginatedResource, ITreeNode } from "src/app/core/types";
import { IBookListItem, ICategory } from "src/app/core/types/catalog";
import { defaultPaginationQuery, emptyResource } from "src/app/util/pagination";
import { searchOperator } from "src/app/util/search.operator";

@Component({
  selector: "bw-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  @ViewChild("booksList") booksList: ElementRef<HTMLElement>;

  searchInput = new FormControl();
  books: IPaginatedResource<IBookListItem> = emptyResource();
  booksInCartHash: { [bookId: string]: boolean } = {};
  booksOwnedHash: { [bookId: string]: boolean } = {};
  categoryTree: ITreeNode<ICategory>[];
  category: ICategory;
  hasNextPage = false;

  constructor(
    public bookService: BookService,
    public cartService: ShoppingCartService,
    public categoryService: CategoryService,
    public auth: AuthenticationService,
    public snacks: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchBooks({ page: 1 });

    this.searchInput.valueChanges
      .pipe(
        searchOperator,
        map((searchString: string) =>
          this.fetchBooks({ page: 1, search: searchString })
        )
      )
      .subscribe();

    // if an user deletes the search string,
    // load the initial list of books
    this.searchInput.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val: string) => {
        if (val !== "") {
          return;
        }

        this.fetchBooks({ page: 1 });
      });

    this.cartService.content$.subscribe(cart => {
      // checks which books are already in the cart
      // so that the "add to cart" button will get disabled
      this.booksInCartHash = cart.items.reduce((prev, curr) => {
        prev[curr.bookId] = true;

        return prev;
      }, {});
    });

    this.auth.user$.pipe(filter(user => Boolean(user))).subscribe(user => {
      // checks which books are already owned by the user
      // so that the "add to cart" button will be hidden
      this.booksOwnedHash = user.ownedBooks.reduce((prev, curr) => {
        prev[curr] = true;

        return prev;
      }, {});
    });

    this.categoryService.getCategoryTree().subscribe(categoryTree => {
      this.categoryTree = categoryTree;
    });
  }

  onBuyPressed(book: IBookListItem) {
    this.cartService.addItem(book.id).subscribe(response => {
      const snack = this.snacks.open(
        `${book.title} was added to your cart.`,
        "View Cart",
        {
          duration: 3500
        }
      );

      snack.onAction().subscribe(() => {
        this.router.navigate(["shopping-cart"]);
      });
    });
  }

  onCategorySelected(categorySelected: ICategory | null) {
    this.category = categorySelected;

    this.bookService
      .getAll({
        ...defaultPaginationQuery(),
        categoryId: this.category ? this.category.id : undefined
      })
      .pipe(
        map(books => {
          this.books = books;
          this.hasNextPage = books.page < books.pageCount;
          this.scrollToBooks();
        })
      )
      .subscribe();
  }

  loadNext() {
    this.fetchBooks({
      page: this.books.page + 1,
      search: this.searchInput.value
    });
  }

  loadPrev() {
    this.fetchBooks({
      page: this.books.page - 1,
      search: this.searchInput.value
    });
  }

  fetchBooks({ page, search }: { page: number; search?: string }) {
    this.bookService
      .getAll({
        page: page || 1,
        pageSize: 10,
        search,
        categoryId: this.category ? this.category.id : undefined
      })
      .subscribe(books => {
        this.books = books;
        this.hasNextPage = books.page < books.pageCount;
        this.scrollToBooks();
      });
  }

  clearSearch() {
    this.searchInput.setValue("");
  }

  private scrollToBooks() {
    if (!this.booksList) {
      return;
    }

    this.booksList.nativeElement.scrollTo({
      behavior: "smooth"
    });
  }
}
