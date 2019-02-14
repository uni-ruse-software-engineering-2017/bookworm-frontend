import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { PublicRoutingModule } from "./public-routing.module";
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, SharedModule, PublicRoutingModule]
})
export class PublicModule {}
