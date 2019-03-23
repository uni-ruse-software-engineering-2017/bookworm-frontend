import { NgModule } from "@angular/core";
import { HttpErrorHandlerService } from "./http-error-handler.service";
import { AuthorResolver } from "./resolvers/author.resolver";
import { BookResolver } from "./resolvers/book.resolver";
import { AdminGuard } from "./route-guards/admin.guard";
import { CustomerGuard } from "./route-guards/customer.guard";
import { NoSessionGuard } from "./route-guards/no-session.guard";
import { ApiService } from "./services/api.service";
import { AuthorService } from "./services/author.service";
import { BookService } from "./services/book.service";
import { CategoryService } from "./services/category.service";

const services = [
  HttpErrorHandlerService,
  ApiService,
  BookService,
  CategoryService,
  AuthorService
];

const routeGuards = [NoSessionGuard, AdminGuard, CustomerGuard];

const routeDataResolvers = [BookResolver, AuthorResolver];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [...services, ...routeGuards, ...routeDataResolvers]
})
export class CoreModule {}
