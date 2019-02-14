import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import { IAuthor, IAuthorListItem } from "../types/catalog";

@Injectable()
export class AuthorService {
  apiUrl = `${environment.api}/catalog/authors`;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.apiUrl}`) as Observable<
      IPaginatedResource<IAuthorListItem>
    >;
  }

  getById(authorId: string) {
    return this.httpClient.get(`${this.apiUrl}/${authorId}`) as Observable<
      IAuthor
    >;
  }
}
