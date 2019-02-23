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
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(
        user => {
          if (!user || user.role !== "admin") {
            this.router.navigate(["/no-found"]);
            return false;
          }

          return true;
        },
        () => {
          this.router.navigate(["/not-found"]);
          return of(false);
        }
      )
    );
  }
}
