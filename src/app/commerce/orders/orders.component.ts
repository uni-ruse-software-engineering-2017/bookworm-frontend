import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { PurchaseService } from "src/app/core/services/purchase.service";
import { IPaginatedResource } from "src/app/core/types";
import { IPurchase } from "src/app/core/types/commerce";
import { emptyResource, IPaginationQuery } from "src/app/util/pagination";

@Component({
  selector: "bw-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  orders: IPaginatedResource<IPurchase> = emptyResource();
  displayedColumns: string[] = [
    "id",
    "books",
    "date",
    "isPaid",
    "total",
    "actions"
  ];
  dataSource: {
    id: string;
    placedAt: Date;
    total: number;
    books: string;
    isPaid: boolean;
  }[] = [];

  constructor(public purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(query?: IPaginationQuery) {
    this.purchaseService.getAll(query).subscribe(orders => {
      this.orders = orders;
      this.dataSource = this.orders.items.map(order => {
        return {
          id: order.id,
          placedAt: new Date(order.placedAt),
          total: order.snapshot.reduce((sum, book) => {
            return (sum += Number(book.price));
          }, 0),
          books: order.snapshot.map(book => book.title).join(", "),
          isPaid: order.isPaid
        };
      });
    });
  }

  onPaginate(event: PageEvent) {
    this.getOrders({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }
}
