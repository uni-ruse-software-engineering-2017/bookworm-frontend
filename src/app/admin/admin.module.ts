// tslint:disable:max-line-length
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AuthorsManagementListComponent } from "./authors-management/authors-management-list/authors-management-list.component";
import { AuthorsManagementComponent } from "./authors-management/authors-management.component";
import { CreateAuthorFormComponent } from "./authors-management/create-author-form/create-author-form.component";
import { EditAuthorFormComponent } from "./authors-management/edit-author-form/edit-author-form.component";
import { BooksManagementListComponent } from "./books-management/books-management-list/books-management-list.component";
import { BooksManagementComponent } from "./books-management/books-management.component";
import { CreateBookFormComponent } from "./books-management/create-book-form/create-book-form.component";
import { EditBookFormComponent } from "./books-management/edit-book-form/edit-book-form.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";
import { CreateCategoryFormComponent } from "./category-management/create-category-form/create-category-form.component";

@NgModule({
  declarations: [
    BooksManagementComponent,
    AuthorsManagementComponent,
    CategoryManagementComponent,
    AuthorsManagementListComponent,
    CreateAuthorFormComponent,
    EditAuthorFormComponent,
    CreateBookFormComponent,
    BooksManagementListComponent,
    CreateCategoryFormComponent,
    AdminDashboardComponent,
    EditBookFormComponent
  ],
  entryComponents: [
    CreateAuthorFormComponent,
    EditAuthorFormComponent,
    CreateCategoryFormComponent
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
