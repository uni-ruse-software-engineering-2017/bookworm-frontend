import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  buildQueryParamsFromPagination,
  IPaginationQuery
} from "src/app/util/pagination";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import {
  IBookDetailed,
  IBookListItem,
  IEditBook,
  INewBook
} from "../types/catalog";

@Injectable({ providedIn: "root" })
export class BookService {
  apiUrl = `${environment.api}/catalog/books`;

  constructor(private httpClient: HttpClient) {}

  getAll(
    query?: IPaginationQuery & {
      categoryId?: string;
    }
  ) {
    const queryParams = buildQueryParamsFromPagination(query);
    const categoryQuery = query ? query.categoryId : null;

    if (categoryQuery) {
      queryParams.category_id = categoryQuery;
    }

    return this.httpClient.get(`${this.apiUrl}`, {
      params: queryParams
    }) as Observable<IPaginatedResource<IBookListItem>>;
  }

  getById(bookId: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${bookId}`)
      .pipe(map(response => response as IBookDetailed));
  }

  create(bookData: INewBook) {
    return this.httpClient
      .post(`${this.apiUrl}`, bookData)
      .pipe(map(response => response as IBookDetailed));
  }

  edit(bookId: string, bookData: IEditBook) {
    return this.httpClient
      .patch(`${this.apiUrl}/${bookId}`, bookData)
      .pipe(map(response => response as IBookDetailed));
  }

  delete(bookId: string) {
    return this.httpClient
      .delete(`${this.apiUrl}/${bookId}`)
      .pipe(map(response => response as null));
  }

  searchByISBN(isbn: string) {
    const api = environment.api;
    return this.httpClient
      .get(`${api}/catalog/goodreads/books/${isbn}`)
      .pipe(map(response => response as IBookDetailed));
  }
}
