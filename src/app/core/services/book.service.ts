import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import { IBook, IBookDetailed, IBookListItem } from "../types/catalog";

@Injectable({ providedIn: "root" })
export class BookService {
  apiUrl = `${environment.api}/catalog/books`;

  constructor(private httpClient: HttpClient) {}

  getAll(query?: { categoryId?: string }) {
    const q = query || {};

    return this.httpClient.get(`${this.apiUrl}`, {
      params: {
        [q.categoryId ? "category_id" : undefined]: q.categoryId
      }
    }) as Observable<IPaginatedResource<IBookListItem>>;
  }

  getById(bookId: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${bookId}`)
      .pipe(map(response => response as IBookDetailed));
  }

  create(bookData: IBook) {
    return this.httpClient
      .post(`${this.apiUrl}`, bookData)
      .pipe(map(response => response as IBookDetailed));
  }

  edit(bookId: string, bookData: IBook) {
    return this.httpClient
      .patch(`${this.apiUrl}/${bookId}`, bookData)
      .pipe(map(response => response as IBookDetailed));
  }
}
