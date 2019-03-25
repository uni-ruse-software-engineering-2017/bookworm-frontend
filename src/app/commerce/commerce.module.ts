import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommerceRoutingModule } from "./commerce-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { SubscriptionPlansComponent } from "./subscription-plans/subscription-plans.component";

@NgModule({
  declarations: [
    ShoppingCartComponent,
    OrdersComponent,
    SubscriptionPlansComponent
  ],
  imports: [CommonModule, CommerceRoutingModule, SharedModule]
})
export class CommerceModule {}
