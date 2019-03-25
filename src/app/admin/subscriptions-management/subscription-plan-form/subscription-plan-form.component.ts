import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { finalize } from "rxjs/operators";
import { SubscriptionPlanService } from "src/app/core/services/subscription-plan.service";
import { ISubscriptionPlan } from "src/app/core/types/commerce";
import { toggleFormDisabledState } from "src/app/util/ng";

@Component({
  selector: "bw-subscription-plan-form",
  templateUrl: "./subscription-plan-form.component.html",
  styleUrls: ["./subscription-plan-form.component.scss"]
})
export class SubscriptionPlanFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private plan: ISubscriptionPlan,
    public modalRef: MatDialogRef<SubscriptionPlanFormComponent>,
    private subscriptionPlanService: SubscriptionPlanService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [this.plan ? this.plan.name : "", [Validators.required]],
      pricePerMonth: [
        this.plan ? this.plan.pricePerMonth : 1,
        [Validators.required, Validators.min(1)]
      ],
      booksPerMonth: [
        this.plan ? this.plan.booksPerMonth : 1,
        [Validators.required, Validators.min(1)]
      ]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value as ISubscriptionPlan;

    toggleFormDisabledState(this.form, true);

    const action$ = this.plan
      ? this.edit(this.plan.id, formData)
      : this.create(formData);

    return action$
      .pipe(
        finalize(() => {
          toggleFormDisabledState(this.form, false);
        })
      )
      .subscribe(() => {
        this.modalRef.close(true);
      });
  }

  create(formData: ISubscriptionPlan) {
    return this.subscriptionPlanService.create(formData);
  }

  edit(id: string, formData: ISubscriptionPlan) {
    return this.subscriptionPlanService.edit(id, formData);
  }
}
