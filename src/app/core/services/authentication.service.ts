import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpErrorInterceptorSkip } from "../http-error-interceptor";
import { ILoginCredentials, ISignUpData, IUserProfile } from "../types/user";
import { ShoppingCartService } from "./shopping-cart.service";

const apiUrl = `${environment.api}`;

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public user$ = new ReplaySubject<IUserProfile>(null);

  constructor(
    private httpClient: HttpClient,
    private shoppingCart: ShoppingCartService
  ) {
    this.getProfile().subscribe(
      profile => {
        this.user$.next(profile);
        if (profile.role === "customer") {
          this.shoppingCart.fetchContents().subscribe();
        }
      },
      error => this.user$.next(null)
    );
  }

  login(credentials: ILoginCredentials) {
    return this.httpClient
      .post(`${apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        map((response: { token: string }) => {
          const { token } = response;

          // refresh the cart on login
          this.shoppingCart.fetchContents().subscribe();

          return this.getProfile();
        }),
        map(profile$ => {
          return profile$
            .pipe(
              map(profile => {
                this.user$.next(profile);
              })
            )
            .subscribe();
        })
      );
  }

  signUp(signUpData: ISignUpData) {
    return this.httpClient.post(`${apiUrl}/sign-up`, signUpData).pipe(
      map((response: { success: boolean }) => {
        return response.success;
      })
    );
  }

  logout() {
    return this.httpClient.post(`${apiUrl}/logout`, {}).pipe(
      map((response: { success: boolean }) => {
        this.user$.next(null);
        this.shoppingCart.clearLocal();
        return response.success;
      })
    );
  }

  getProfile() {
    const headers = new HttpHeaders().set(HttpErrorInterceptorSkip, "");
    return this.httpClient
      .get(`${apiUrl}/user/profile`, { headers, withCredentials: true })
      .pipe(
        map((userProfile: IUserProfile) => {
          this.user$.next(userProfile);
          return userProfile;
        })
      );
  }
}
