import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ZeropadPipe } from "src/app/shared/zeropad.pipe";

@Injectable({ providedIn: "root" })
export class OrderResolver implements Resolve<string> {
  constructor(private zeropad: ZeropadPipe) {}

  resolve(route: ActivatedRouteSnapshot) {
    const orderId = route.paramMap.get("orderId");
    return this.zeropad.transform(orderId);
  }
}
