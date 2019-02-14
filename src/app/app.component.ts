import { Component } from "@angular/core";
import { LoadingService } from "./core/loading.service";
import { AuthenticationService } from "./core/services/authentication.service";

@Component({
  selector: "bw-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    public loading: LoadingService,
    public authService: AuthenticationService
  ) {}

  logout() {
    this.authService.logout().subscribe();
  }
}
