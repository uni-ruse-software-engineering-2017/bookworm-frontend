import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class WithCredentialsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;

    // if we are uploading a file we should let the browser set the correct headers
    // or if the content-type is explicitly set the by the user we should respect it
    if (!req.reportProgress && !req.headers.has("Content-Type")) {
      headers = headers.set("Content-Type", "application/json");
    }

    if (!req.headers.has("Accept")) {
      headers = headers.set("Accept", "application/json");
    }

    const authReq = req.clone({ headers, withCredentials: true });
    return next.handle(authReq);
  }
}
