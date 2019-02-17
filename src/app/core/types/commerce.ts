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
  placedAt: string;
  paidAt: string;
  isPaid: boolean;
  snapshot: IPurchaseSnapshot[];
}
