import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ShoppingCartService } from "src/app/core/services/shopping-cart.service";
import { ICartContent, ICartLine } from "src/app/core/types/commerce";
import { environment } from "src/environments/environment";

declare const Stripe: any;

const stripe = Stripe(environment.stripeKey);

@Component({
  selector: "bw-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit {
  cart: ICartContent = {
    items: [],
    total: 0
  };

  constructor(
    public cartService: ShoppingCartService,
    public snackbars: MatSnackBar
  ) {}

  ngOnInit() {
    this.cartService.content$.subscribe(cartContent => {
      this.cart = cartContent;
    });

    this.fetchCart();
  }

  fetchCart() {
    this.cartService.fetchContents().subscribe();
  }

  removeItem(cartLine: ICartLine) {
    this.cartService.removeItem(cartLine.id).subscribe();
  }

  clearCart() {
    this.cartService.clear().subscribe();
  }

  checkout() {
    this.cartService.checkout().subscribe(checkoutSession => {
      stripe
        .redirectToCheckout({
          sessionId: checkoutSession.id
        })
        .then(result => {
          // show error message if any
          if (result.error) {
            this.snackbars.open(result.error.message, null, { duration: 5000 });
          }
        });
    });
  }
}
