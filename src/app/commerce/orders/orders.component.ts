import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "src/app/core/services/purchase.service";
import { IPurchase } from "src/app/core/types/commerce";

@Component({
  selector: "bw-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  orders: IPurchase[] = [];

  constructor(public purchaseService: PurchaseService) {}

  ngOnInit() {
    this.purchaseService.getAll().subscribe(response => {
      this.orders = response.items;
    });
  }
}
