import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorHandlerService } from "src/app/core/http-error-handler.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";

interface ILoginModel {
  emailAddress: string;
  password: string;
}

@Component({
  selector: "bw-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailAddress: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return false;
    }

    const formData = Object.assign(this.loginForm.value) as ILoginModel;

    return this.auth
      .login({
        email: formData.emailAddress,
        password: formData.password
      })
      .subscribe(
        () => this.router.navigate([""]),
        error => this.errorHandler.handle(error)
      );
  }
}
