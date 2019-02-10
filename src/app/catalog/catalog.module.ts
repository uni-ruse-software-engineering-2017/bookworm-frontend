import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthorsComponent } from "./authors/authors.component";
import { BooksComponent } from "./books/books.component";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { CategoriesComponent } from "./categories/categories.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    HomeComponent,
    AuthorsComponent,
    BooksComponent,
    CategoriesComponent
  ],
  imports: [CommonModule, CatalogRoutingModule, SharedModule]
})
export class CatalogModule {}
