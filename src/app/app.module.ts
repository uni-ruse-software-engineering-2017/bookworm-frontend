import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppShellModule } from "./app-shell/app-shell.module";
import { AppComponent } from "./app.component";
import { CatalogModule } from "./catalog/catalog.module";
import { CoreModule } from "./core/core.module";
import { LoadingInterceptor } from "./core/loading-interceptor";
import { LoadingService } from "./core/loading.service";
import { BookService } from "./core/services/book.service";
import { CategoryService } from "./core/services/category.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    AppShellModule,
    BrowserAnimationsModule,
    RouterModule,
    CatalogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    LoadingService,
    BookService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
