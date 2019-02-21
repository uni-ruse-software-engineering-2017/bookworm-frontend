import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthorDetailsComponent } from "./authors/author-details/author-details.component";
import { AuthorsComponent } from "./authors/authors.component";
import { BookDetailsComponent } from "./books/book-details/book-details.component";
import { BooksComponent } from "./books/books.component";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { CategoriesComponent } from "./categories/categories.component";
import { HomeComponent } from "./home/home.component";
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    AuthorsComponent,
    BooksComponent,
    CategoriesComponent,
    AuthorDetailsComponent,
    BookDetailsComponent,
    CategoryDetailsComponent
  ],
  imports: [CommonModule, CatalogRoutingModule, SharedModule]
})
export class CatalogModule {}
