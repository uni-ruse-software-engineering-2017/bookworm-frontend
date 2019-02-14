import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import { IBookDetailed, IBookListItem } from "../types/catalog";

@Injectable()
export class BookService {
  apiUrl = `${environment.api}/catalog/books`;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get(`${this.apiUrl}`)
      .pipe(map(response => response as IPaginatedResource<IBookListItem>));
  }

  getById(bookId: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${bookId}`)
      .pipe(map(response => response as IBookDetailed));
  }
}
