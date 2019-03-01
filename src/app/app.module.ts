import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppShellModule } from "./app-shell/app-shell.module";
import { AppComponent } from "./app.component";
import { CatalogModule } from "./catalog/catalog.module";
import { CommerceModule } from "./commerce/commerce.module";
import { CoreModule } from "./core/core.module";
import { HttpErrorInterceptor } from "./core/http-error-interceptor";
import { LoadingInterceptor } from "./core/loading-interceptor";
import { WithCredentialsInterceptor } from "./core/with-credentials-interceptor";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PublicModule } from "./public/public.module";
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
    PublicModule,
    CommerceModule,
    CatalogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
