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
  displayedColumns: string[] = ["id", "books", "date", "total"];
  dataSource: {
    id: string;
    placedAt: Date;
    total: number;
    books: string;
  }[] = [];

  constructor(public purchaseService: PurchaseService) {}

  ngOnInit() {
    this.purchaseService.getAll().subscribe(response => {
      this.orders = response.items;
      this.dataSource = this.orders.map(order => {
        return {
          id: order.id,
          placedAt: new Date(order.placedAt),
          total: order.snapshot.reduce((sum, book) => {
            return (sum += Number(book.price));
          }, 0),
          books: order.snapshot.map(book => book.title).join(", ")
        };
      });
    });
  }
}
