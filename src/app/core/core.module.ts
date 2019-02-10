import { NgModule } from "@angular/core";
import { HttpErrorHandlerService } from "./http-error-handler.service";
import { ApiService } from "./services/api.service";
import { AuthorService } from "./services/author.service";
import { BookService } from "./services/book.service";
import { CategoryService } from "./services/category.service";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    HttpErrorHandlerService,
    ApiService,
    BookService,
    CategoryService,
    AuthorService
  ]
})
export class CoreModule {}
