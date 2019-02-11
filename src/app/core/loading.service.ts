import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Injectable()
export class LoadingService {
  private pendingRequests = 0;

  public loading$ = new ReplaySubject<boolean>().pipe(
    debounceTime(0) // dirty hack to prevent the fucking annoying ExpressionChangedAfterItHasBeenCheckedError
  ) as ReplaySubject<boolean>;

  constructor() {
    this.loading$.next(false);
  }

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
}
