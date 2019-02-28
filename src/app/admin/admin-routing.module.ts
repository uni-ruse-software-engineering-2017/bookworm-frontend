import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorsManagementComponent } from "./authors-management/authors-management.component";
import { BooksManagementComponent } from "./books-management/books-management.component";
import { CreateBookFormComponent } from "./books-management/create-book-form/create-book-form.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "books-management" },
  {
    path: "books-management",
    component: BooksManagementComponent
    // canActivate: [AdminGuard]
  },
  {
    path: "books-management/create",
    component: CreateBookFormComponent
    // canActivate: [AdminGuard]
  },
  {
    path: "authors-management",
    component: AuthorsManagementComponent
    // canActivate: [AdminGuard]
  },
  {
    path: "category-management",
    component: CategoryManagementComponent
    // canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
