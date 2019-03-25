import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable, of } from "rxjs";
import { filter, flatMap } from "rxjs/operators";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { ISubscriptionPlan } from "src/app/core/types/commerce";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";
import { SubscriptionPlanFormComponent } from "./subscription-plan-form/subscription-plan-form.component";

@Component({
  selector: "bw-subscriptions-management",
  templateUrl: "./subscriptions-management.component.html",
  styleUrls: ["./subscriptions-management.component.scss"]
})
export class SubscriptionsManagementComponent implements OnInit {
  plans$: Observable<ISubscriptionPlan[]> = of([]);

  constructor(
    private subscriptionPlanService: SubscriptionPlanService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.plans$ = this.subscriptionPlanService.getAll();
  }

  removePlan(plan: ISubscriptionPlan) {
    const modalRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: `Delete plan ${plan.name}`,
        message: "Are you sure you want to delete this plan?",
        color: "error"
      } as IConfirmationModalComponentData
    });

    return modalRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        flatMap(() => this.subscriptionPlanService.delete(plan.id))
      )
      .subscribe(() => (this.plans$ = this.subscriptionPlanService.getAll()));
  }

  createPlan() {
    const modalRef = this.dialog.open(SubscriptionPlanFormComponent);

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => (this.plans$ = this.subscriptionPlanService.getAll()));
  }

  editPlan(plan: ISubscriptionPlan) {
    const modalRef = this.dialog.open(SubscriptionPlanFormComponent, {
      data: plan
    });

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => (this.plans$ = this.subscriptionPlanService.getAll()));
  }
}
