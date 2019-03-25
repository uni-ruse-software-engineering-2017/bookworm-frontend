import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { ISubscriptionPlan } from "src/app/core/types/commerce";

@Component({
  selector: "bw-subscription-plans",
  templateUrl: "./subscription-plans.component.html",
  styleUrls: ["./subscription-plans.component.scss"]
})
export class SubscriptionPlansComponent implements OnInit {
  plans$: Observable<ISubscriptionPlan[]> = of([]);

  constructor(private subscriptionService: SubscriptionPlanService) {}

  ngOnInit() {
    this.plans$ = this.subscriptionService.getAll();
  }
}
