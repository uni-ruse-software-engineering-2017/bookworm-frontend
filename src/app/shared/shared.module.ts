import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BookListItemComponent } from "./book-list-item/book-list-item.component";
import { CategoriesTreeComponent } from "./categories-tree/categories-tree.component";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";
import { ImgFallbackDirective } from "./image-fallback.directive";
import { MaterialComponentsModule } from "./material-components.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BookListItemComponent,
    ConfirmationModalComponent,
    ImgFallbackDirective,
    CategoriesTreeComponent
  ],
  entryComponents: [ConfirmationModalComponent],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    BookListItemComponent,
    ConfirmationModalComponent,
    ImgFallbackDirective,
    CategoriesTreeComponent
  ]
})
export class SharedModule {}
