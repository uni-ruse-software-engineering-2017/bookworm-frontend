import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "bw-payment-failed",
  templateUrl: "./payment-failed.component.html",
  styleUrls: ["./payment-failed.component.scss"]
})
export class PaymentFailedComponent implements OnInit {
  orderId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParams.purchase_id;
  }
}
