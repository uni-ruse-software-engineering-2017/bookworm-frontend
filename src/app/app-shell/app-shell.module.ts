import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AppShellComponent } from "./app-shell.component";

@NgModule({
  declarations: [AppShellComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [AppShellComponent]
})
export class AppShellModule {}
