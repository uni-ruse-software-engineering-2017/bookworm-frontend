import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class NoSessionGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(
        user => {
          if (!user) {
            return true;
          }

          this.router.navigate(["/"]);
          return false;
        },
        () => {
          return of(true);
        }
      )
    );
  }
}
