import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BookListItemComponent } from "./book-list-item/book-list-item.component";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";
import { MaterialComponentsModule } from "./material-components.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [BookListItemComponent, ConfirmationModalComponent],
  entryComponents: [ConfirmationModalComponent],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    BookListItemComponent,
    ConfirmationModalComponent
  ]
})
export class SharedModule {}
