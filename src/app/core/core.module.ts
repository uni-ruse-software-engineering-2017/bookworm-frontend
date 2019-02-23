import { NgModule } from "@angular/core";
import { HttpErrorHandlerService } from "./http-error-handler.service";
import { AdminGuard } from "./route-guards/admin.guard";
import { NoSessionGuard } from "./route-guards/no-session.guard";
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
    AuthorService,
    NoSessionGuard,
    AdminGuard
  ]
})
export class CoreModule {}
