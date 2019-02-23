import { Component, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface IConfirmationModalComponentData {
  title: string;
  message: string;
  color?: "primary" | "error" | "warn" | "accent";
}

@Component({
  selector: "bw-confirmation-modal",
  template: `
    <h1 class="mat-title">{{ title }}</h1>
    <p>{{ message }}</p>
    <section class="actions">
      <button mat-button (click)="dialogRef.close(false)">
        <span translate>Cancel</span>
      </button>
      <button mat-raised-button [color]="color" (click)="dialogRef.close(true)">
        <span translate>Confirm</span>
      </button>
    </section>
  `,
  styles: [
    `
      .actions {
        margin-top: 16px;
        text-align: right;
      }
      button {
        text-transform: uppercase;
        margin-right: 16px;
      }
    `
  ]
})
export class ConfirmationModalComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() color: "primary" | "error" | "warn" | "accent" = "primary";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IConfirmationModalComponentData,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {
    this.title = data.title;
    this.message = data.message;
    this.color = data.color;
  }
}
