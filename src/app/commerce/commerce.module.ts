import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommerceRoutingModule } from "./commerce-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { SubscriptionPlansComponent } from "./subscription-plans/subscription-plans.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { PaymentSuccessfulComponent } from "./payment-successful/payment-successful.component";
import { PaymentFailedComponent } from "./payment-failed/payment-failed.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";

@NgModule({
  declarations: [
    ShoppingCartComponent,
    OrdersComponent,
    SubscriptionPlansComponent,
    MyProfileComponent,
    PaymentSuccessfulComponent,
    PaymentFailedComponent,
    OrderDetailsComponent
  ],
  imports: [CommonModule, CommerceRoutingModule, SharedModule]
})
export class CommerceModule {}
