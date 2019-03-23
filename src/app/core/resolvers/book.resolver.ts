import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { BookService } from "../services/book.service";
import { IBookDetailed } from "../types/catalog";

@Injectable({ providedIn: "root" })
export class BookResolver implements Resolve<IBookDetailed> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.bookService.getById(route.paramMap.get("bookId"));
  }
}
