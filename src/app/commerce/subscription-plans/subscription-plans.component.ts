import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { ISubscriptionPlan } from "src/app/core/types/commerce";
import { IUserProfile } from "src/app/core/types/user";

@Component({
  selector: "bw-subscription-plans",
  templateUrl: "./subscription-plans.component.html",
  styleUrls: ["./subscription-plans.component.scss"]
})
export class SubscriptionPlansComponent implements OnInit {
  plans$: Observable<ISubscriptionPlan[]> = of([]);
  user$: Observable<IUserProfile> = of(null);

  constructor(
    private subscriptionService: SubscriptionPlanService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.plans$ = this.subscriptionService.getAll();
    this.user$ = this.auth.user$;
  }

  subscribe(plan: ISubscriptionPlan) {
    // TODO: go to payments page
    this.subscriptionService.subscribeForPlan(plan.id).subscribe(() => {
      window.location.reload();
    });
  }

  unsubscribe() {
    this.subscriptionService.cancelSubscription().subscribe(() => {
      window.location.reload();
    });
  }
}
