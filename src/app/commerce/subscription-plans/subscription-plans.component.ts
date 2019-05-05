import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Observable, of } from "rxjs";
import { filter, flatMap } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { stripeService } from "src/app/core/services/stripe.service";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { ISubscriptionPlan } from "src/app/core/types/commerce";
import { IUserProfile } from "src/app/core/types/user";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";

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
    public auth: AuthenticationService,
    private dialog: MatDialog,
    public snackbars: MatSnackBar
  ) {}

  ngOnInit() {
    this.plans$ = this.subscriptionService.getAll();
    this.user$ = this.auth.user$;
  }

  subscribe(plan: ISubscriptionPlan) {
    this.subscriptionService
      .subscribeForPlan(plan.id)
      .subscribe(checkoutSession => {
        stripeService
          .redirectToCheckout({
            sessionId: checkoutSession.id
          })
          .then(result => {
            // show error message if any
            if (result.error) {
              this.snackbars.open(result.error.message, null, {
                duration: 5000
              });
            }
          });
      });
  }

  unsubscribe(plan: ISubscriptionPlan) {
    const modalRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: `Unsubscribe from plan "${plan.name}"`,
        message: "Are you sure you want to unsubscribe?",
        color: "error"
      } as IConfirmationModalComponentData
    });

    return modalRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        flatMap(() => this.subscriptionService.cancelSubscription())
      )
      .subscribe(x => {
        window.location.reload();
      });
  }
}
