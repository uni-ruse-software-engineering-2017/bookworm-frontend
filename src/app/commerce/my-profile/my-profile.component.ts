import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { IUserProfile } from "src/app/core/types/user";

@Component({
  selector: "bw-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit {
  profile$: Observable<IUserProfile>;

  constructor(
    private auth: AuthenticationService,
    private subscriptionService: SubscriptionPlanService
  ) {}

  ngOnInit() {
    this.profile$ = this.auth.getProfile();
  }

  unsubscribe() {
    this.subscriptionService.cancelSubscription().subscribe(() => {
      window.location.reload();
    });
  }
}
