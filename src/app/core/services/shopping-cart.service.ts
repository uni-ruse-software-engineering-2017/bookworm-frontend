import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ICartContent, ICartLine, ICheckoutSession } from "../types/commerce";

const INITIAL_STATE: ICartContent = {
  items: [],
  total: 0
};

@Injectable({ providedIn: "root" })
export class ShoppingCartService {
  apiUrl = `${environment.api}/cart`;

  public content$ = new BehaviorSubject(INITIAL_STATE);

  constructor(private httpClient: HttpClient, private router: Router) {}

  fetchContents() {
    return this.httpClient.get(this.apiUrl).pipe(
      map(response => {
        const cartContent = response as ICartContent;

        this.content$.next(cartContent);

        return cartContent;
      })
    );
  }

  addItem(bookId: string) {
    return this.httpClient
      .post(this.apiUrl, {
        bookId
      })
      .pipe(
        map(response => {
          const cartLine = response as ICartLine;

          // add the new item to the state
          const currentContent = this.content$.getValue();
          const newContent: ICartContent = {
            items: [...currentContent.items, cartLine],
            total: Number(currentContent.total) + Number(cartLine.price)
          };
          this.content$.next(newContent);

          return cartLine;
        }),
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(["login"], {
              queryParams: {
                prevUrl: encodeURIComponent(window.location.pathname)
              }
            });
          }

          return throwError(error);
        })
      );
  }

  removeItem(cartLineId: string) {
    return this.httpClient.delete(`${this.apiUrl}/${cartLineId}`).pipe(
      map(() => {
        const currentContent = this.content$.getValue();
        const removedItem = currentContent.items.find(
          item => item.id === cartLineId
        );
        const remainingItems = currentContent.items.filter(
          item => item.id !== cartLineId
        );
        const newContent: ICartContent = {
          items: remainingItems,
          total: currentContent.total - Number(removedItem.price)
        };

        this.content$.next(newContent);

        return removedItem;
      })
    );
  }

  clear() {
    return this.httpClient.delete(this.apiUrl).pipe(
      map(() => {
        this.content$.next(INITIAL_STATE);
        return INITIAL_STATE;
      })
    );
  }

  clearLocal() {
    this.content$.next(INITIAL_STATE);
    return INITIAL_STATE;
  }

  checkout() {
    return this.httpClient.post<ICheckoutSession>(
      `${this.apiUrl}/checkout`,
      {}
    );
  }
}
