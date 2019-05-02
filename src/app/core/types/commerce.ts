export interface ICartLine {
  id?: string;
  bookId: string;
  title: string;
  price: number;
  coverImage: string;
  available: boolean;
  author: {
    id: string;
    name: string;
  };
}

export interface ICartContent {
  items: ICartLine[];
  total: number;
}

export interface ISubscriptionPlan {
  readonly id?: string;
  name: string;
  booksPerMonth: number;
  pricePerMonth: number;
}

export interface IUserSubscription extends ISubscriptionPlan {
  credits: ISubscriptionCredits;
  lastRenewedAt: null | Date;
  expiresAt: Date;
  subscribedAt: Date;
}

export interface ISubscriptionCredits {
  limit: number;
  used: number;
}

export interface IPurchaseSnapshot {
  author: {
    id: string;
    name: string;
  };
  available: boolean;
  title: string;
  coverImage: string;
  id: string;
  price: string;
  bookId: string;
}

export interface IPurchase {
  id: string;
  paymentMethod: string;
  paymentId: string;
  placedAt: string;
  paidAt: string;
  isPaid: boolean;
  snapshot: IPurchaseSnapshot[];
}

export interface ICheckoutSession {
  id: string;
  object: string;
  billing_address_collection?: any;
  cancel_url: string;
  client_reference_id: string;
  customer?: any;
  customer_email: string;
  display_items: IDisplayItem[];
  livemode: boolean;
  locale?: any;
  payment_intent: string;
  payment_method_types: string[];
  subscription?: any;
  success_url: string;
}

interface IDisplayItem {
  amount: number;
  currency: string;
  custom: ICustomData;
  quantity: number;
  type: string;
}

interface ICustomData {
  description: string;
  images: string[];
  name: string;
}
