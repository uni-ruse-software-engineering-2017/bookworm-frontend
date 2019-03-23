import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BreadcrumbsModule } from "@exalif/ngx-breadcrumbs";
import { SharedModule } from "../shared/shared.module";
import { AppShellComponent } from "./app-shell.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";

@NgModule({
  declarations: [AppShellComponent, BreadcrumbsComponent],
  imports: [CommonModule, SharedModule, RouterModule, BreadcrumbsModule],
  exports: [AppShellComponent]
})
export class AppShellModule {}
