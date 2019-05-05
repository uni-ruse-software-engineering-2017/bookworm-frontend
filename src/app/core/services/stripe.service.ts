import { environment } from "src/environments/environment";

declare const Stripe: any;

export const stripeService = Stripe(environment.stripeKey);
