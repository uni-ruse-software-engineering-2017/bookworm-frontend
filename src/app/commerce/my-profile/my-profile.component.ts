import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { filter, flatMap } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { ISubscriptionPlan } from "src/app/core/types/commerce";
import { IUserProfile } from "src/app/core/types/user";
import {
  ConfirmationModalComponent,
  IConfirmationModalComponentData
} from "src/app/shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "bw-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit {
  profile$: Observable<IUserProfile>;

  constructor(
    private auth: AuthenticationService,
    private subscriptionService: SubscriptionPlanService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.profile$ = this.auth.getProfile();
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
