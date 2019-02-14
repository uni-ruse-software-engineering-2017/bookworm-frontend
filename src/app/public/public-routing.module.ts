import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoSessionGuard } from "../core/route-guards/no-session.guard";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [NoSessionGuard]
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    canActivate: [NoSessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
