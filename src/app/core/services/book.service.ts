import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  buildQueryParamsFromPagination,
  IPaginationQuery
} from "src/app/util/pagination";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import {
  IBookDetailed,
  IBookFile,
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

    return this.httpClient.get<IPaginatedResource<IBookListItem>>(
      `${this.apiUrl}`,
      {
        params: queryParams
      }
    );
  }

  getById(bookId: string) {
    return this.httpClient.get<IBookDetailed>(`${this.apiUrl}/${bookId}`);
  }

  create(bookData: INewBook) {
    return this.httpClient.post<IBookDetailed>(`${this.apiUrl}`, bookData);
  }

  edit(bookId: string, bookData: IEditBook) {
    return this.httpClient.patch<IBookDetailed>(
      `${this.apiUrl}/${bookId}`,
      bookData
    );
  }

  delete(bookId: string) {
    return this.httpClient.delete<null>(`${this.apiUrl}/${bookId}`);
  }

  searchByISBN(isbn: string) {
    const api = environment.api;
    return this.httpClient.get<IBookDetailed | null>(
      `${api}/catalog/goodreads/books/${isbn}`
    );
  }

  getBookFiles(bookId: string) {
    return this.httpClient.get<IBookFile[]>(`${this.apiUrl}/${bookId}/files`);
  }
}
