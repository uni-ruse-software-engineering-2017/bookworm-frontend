import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthorDetailsComponent } from "./authors/author-details/author-details.component";
import { AuthorsComponent } from "./authors/authors.component";
import { BookDetailsComponent } from "./books/book-details/book-details.component";
import { BooksComponent } from "./books/books.component";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { HomeComponent } from "./home/home.component";
import { ReadBookOnlineComponent } from "./books/read-book-online/read-book-online.component";

@NgModule({
  declarations: [
    HomeComponent,
    AuthorsComponent,
    BooksComponent,
    AuthorDetailsComponent,
    BookDetailsComponent,
    ReadBookOnlineComponent
  ],
  imports: [CommonModule, CatalogRoutingModule, SharedModule]
})
export class CatalogModule {}
