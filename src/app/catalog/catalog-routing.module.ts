import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorResolver } from "../core/resolvers/author.resolver";
import { BookResolver } from "../core/resolvers/book.resolver";
import { CustomerGuard } from "../core/route-guards/customer.guard";
import { NotFoundComponent } from "../not-found/not-found.component";
import { AuthorDetailsComponent } from "./authors/author-details/author-details.component";
import { AuthorsComponent } from "./authors/authors.component";
import { BookDetailsComponent } from "./books/book-details/book-details.component";
import { BooksComponent } from "./books/books.component";
import { ReadBookOnlineComponent } from "./books/read-book-online/read-book-online.component";
import { HomeComponent } from "./home/home.component";
import { MyBooksComponent } from "./my-books/my-books.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: {
      breadcrumbs: "Home"
    }
  },
  {
    path: "authors",
    data: {
      breadcrumbs: "Authors"
    },
    children: [
      {
        path: "",
        component: AuthorsComponent
      },
      {
        path: ":authorId/details",
        component: AuthorDetailsComponent,
        data: {
          breadcrumbs: "{{ author.name }}"
        },
        resolve: {
          author: AuthorResolver
        }
      }
    ]
  },
  {
    path: "books",
    data: {
      breadcrumbs: "Catalog"
    },
    children: [
      {
        path: "",
        component: BooksComponent
      },
      {
        path: ":bookId/details",
        data: {
          breadcrumbs: "{{ book.title }}"
        },
        resolve: {
          book: BookResolver
        },
        children: [
          {
            path: "",
            component: BookDetailsComponent
          },
          {
            path: "online-reader",
            component: ReadBookOnlineComponent,
            data: {
              breadcrumbs: "Online Reader"
            }
          }
        ]
      }
    ]
  },
  {
    path: "my-books",
    component: MyBooksComponent,
    canActivate: [CustomerGuard],
    data: {
      breadcrumbs: "My Books"
    }
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
