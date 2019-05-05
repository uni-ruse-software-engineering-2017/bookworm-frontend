import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { PurchaseService } from "src/app/core/services/purchase.service";
import { stripeService } from "src/app/core/services/stripe.service";
import { IPurchase } from "src/app/core/types/commerce";

@Component({
  selector: "bw-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"]
})
export class OrderDetailsComponent implements OnInit {
  orderId = "";
  purchase: IPurchase = null;
  total = 0;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    public snackbars: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = params.orderId;

      this.purchaseService.getById(this.orderId).subscribe(purchase => {
        this.purchase = purchase;

        this.total = purchase.snapshot.reduce((acc, curr) => {
          acc += Number(curr.price);
          return acc;
        }, 0);
      });
    });
  }

  payPurchase() {
    stripeService
      .redirectToCheckout({
        sessionId: this.purchase.paymentId
      })
      .then(result => {
        // show error message if any
        if (result.error) {
          this.snackbars.open(result.error.message, null, { duration: 5000 });
        }
      });
  }
}
