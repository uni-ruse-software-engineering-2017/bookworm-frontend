import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ILoginCredentials, ISignUpData, IUserProfile } from "../types/user";

const apiUrl = `${environment.api}`;

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public user$ = new ReplaySubject<IUserProfile>(null);

  constructor(private httpClient: HttpClient) {
    this.getProfile().subscribe(
      profile => {
        this.user$.next(profile);
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
        return response.success;
      })
    );
  }

  getProfile() {
    return this.httpClient
      .get(`${apiUrl}/user/profile`)
      .pipe(map(res => res as IUserProfile));
  }
}