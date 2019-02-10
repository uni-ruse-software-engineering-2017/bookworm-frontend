import { NgModule } from "@angular/core";
import { HttpErrorHandlerService } from "./http-error-handler.service";
import { ApiService } from "./services/api.service";
import { BookService } from "./services/book.service";
import { CategoryService } from "./services/category.service";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [HttpErrorHandlerService, ApiService, BookService, CategoryService]
})
export class CoreModule {}
