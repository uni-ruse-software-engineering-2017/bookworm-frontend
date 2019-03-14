import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpErrorHandlerService } from "./http-error-handler.service";

export const HttpErrorInterceptorSkip = "X-Skip-HTTP-Error-Interceptor";

@Injectable({ providedIn: "root" })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: HttpErrorHandlerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // allows the user to skip automatic error handling
    if (request.headers.has(HttpErrorInterceptorSkip)) {
      const headers = request.headers.delete(HttpErrorInterceptorSkip);
      return next.handle(request.clone({ headers }));
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handle(error);
        return throwError(error);
      })
    );
  }
}
