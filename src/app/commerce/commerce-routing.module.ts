import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerGuard } from "../core/route-guards/customer.guard";
import { OrdersComponent } from "./orders/orders.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

const routes: Routes = [
  {
    path: "shopping-cart",
    component: ShoppingCartComponent,
    data: {
      breadcrumbs: "Shopping Cart"
    }
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [CustomerGuard],
    data: {
      breadcrumbs: "My Orders"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommerceRoutingModule {}
