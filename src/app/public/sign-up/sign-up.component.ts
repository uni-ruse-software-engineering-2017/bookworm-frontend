import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorHandlerService } from "src/app/core/http-error-handler.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ISignUpData } from "src/app/core/types/user";

@Component({
  selector: "bw-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return false;
    }

    const formData = Object.assign(this.signUpForm.value) as ISignUpData;

    return this.auth
      .signUp(formData)
      .subscribe(
        () => this.router.navigate(["/login"]),
        error => this.errorHandler.handle(error)
      );
  }
}
