import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BookListItemComponent } from "./book-list-item/book-list-item.component";
import { MaterialComponentsModule } from "./material-components.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [BookListItemComponent],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    BookListItemComponent
  ]
})
export class SharedModule {}
