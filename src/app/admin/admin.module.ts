// tslint:disable:max-line-length
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AuthorsManagementListComponent } from "./authors-management/authors-management-list/authors-management-list.component";
import { AuthorsManagementComponent } from "./authors-management/authors-management.component";
import { CreateAuthorFormComponent } from "./authors-management/create-author-form/create-author-form.component";
import { EditAuthorFormComponent } from "./authors-management/edit-author-form/edit-author-form.component";
import { BooksManagementComponent } from "./books-management/books-management.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";
import { CreateBookFormComponent } from "./books-management/create-book-form/create-book-form.component";
import { BooksManagementListComponent } from "./books-management/books-management-list/books-management-list.component";

@NgModule({
  declarations: [
    BooksManagementComponent,
    AuthorsManagementComponent,
    CategoryManagementComponent,
    AuthorsManagementListComponent,
    CreateAuthorFormComponent,
    EditAuthorFormComponent,
    CreateBookFormComponent,
    BooksManagementListComponent
  ],
  entryComponents: [CreateAuthorFormComponent, EditAuthorFormComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
