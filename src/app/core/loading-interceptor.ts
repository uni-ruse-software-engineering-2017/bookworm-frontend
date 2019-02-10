import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingBar: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const response = next.handle(req);

    let started = false;
    const responseSubscribe = response.subscribe.bind(response);
    response.subscribe = (...args: any) => {
      this.loadingBar.start();
      started = true;
      return responseSubscribe(...args);
    };

    return response.pipe(finalize(() => started && this.loadingBar.complete()));
  }
}
