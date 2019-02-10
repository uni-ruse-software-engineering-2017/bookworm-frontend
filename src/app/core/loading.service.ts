import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable()
export class LoadingService {
  private pendingRequests = 0;

  public loading$ = new ReplaySubject<boolean>();

  start() {
    this.pendingRequests++;
    this.loading$.next(true);
  }

  complete() {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }

    if (this.pendingRequests === 0) {
      this.loading$.next(false);
    }
  }

  isLoading() {
    return this.pendingRequests > 0;
  }
}
