import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookResolver } from "../core/resolvers/book.resolver";
import { AdminGuard } from "../core/route-guards/admin.guard";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AuthorsManagementComponent } from "./authors-management/authors-management.component";
import { BooksManagementComponent } from "./books-management/books-management.component";
import { CreateBookFormComponent } from "./books-management/create-book-form/create-book-form.component";
import { EditBookFormComponent } from "./books-management/edit-book-form/edit-book-form.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";

const routes: Routes = [
  {
    path: "management",
    canActivate: [AdminGuard],
    data: {
      breadcrumbs: "Administration"
    },
    children: [
      {
        path: "",
        component: AdminDashboardComponent
      },
      {
        path: "books",
        data: {
          breadcrumbs: "Books Management"
        },
        canActivate: [AdminGuard],
        children: [
          {
            path: "",
            component: BooksManagementComponent
          },
          {
            path: "create",
            component: CreateBookFormComponent,
            canActivate: [AdminGuard],
            data: {
              breadcrumbs: "New Book"
            }
          },
          {
            path: "edit/:bookId",
            component: EditBookFormComponent,
            canActivate: [AdminGuard],
            data: {
              breadcrumbs: 'Edit "{{ book.title }}"'
            },
            resolve: {
              book: BookResolver
            }
          }
        ]
      },
      {
        path: "authors",
        component: AuthorsManagementComponent,
        canActivate: [AdminGuard],
        data: {
          breadcrumbs: "Authors"
        }
      },
      {
        path: "category",
        component: CategoryManagementComponent,
        canActivate: [AdminGuard],
        data: {
          breadcrumbs: "Categories"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
