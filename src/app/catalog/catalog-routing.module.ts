import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { AuthorDetailsComponent } from "./authors/author-details/author-details.component";
import { AuthorsComponent } from "./authors/authors.component";
import { BookDetailsComponent } from "./books/book-details/book-details.component";
import { BooksComponent } from "./books/books.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "authors",
    component: AuthorsComponent
  },
  {
    path: "authors/:authorId/details",
    component: AuthorDetailsComponent
  },
  {
    path: "books",
    component: BooksComponent
  },
  {
    path: "books/:bookId/details",
    component: BookDetailsComponent
  },
  {
    path: "not-found",
    component: NotFoundComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/not-found"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}
