import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "bw-payment-successful",
  templateUrl: "./payment-successful.component.html",
  styleUrls: ["./payment-successful.component.scss"]
})
export class PaymentSuccessfulComponent implements OnInit {
  orderId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParams.purchase_id;
  }
}
