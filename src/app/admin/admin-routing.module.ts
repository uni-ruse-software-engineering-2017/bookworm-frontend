import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../core/route-guards/admin.guard";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AuthorsManagementComponent } from "./authors-management/authors-management.component";
import { BooksManagementComponent } from "./books-management/books-management.component";
import { CreateBookFormComponent } from "./books-management/create-book-form/create-book-form.component";
import { EditBookFormComponent } from "./books-management/edit-book-form/edit-book-form.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "books-management",
    component: BooksManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "books-management/create",
    component: CreateBookFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "books-management/edit/:bookId",
    component: EditBookFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "authors-management",
    component: AuthorsManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "category-management",
    component: CategoryManagementComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
