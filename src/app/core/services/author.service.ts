import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { flatMap } from "rxjs/operators";
import {
  buildQueryParamsFromPagination,
  IPaginationQuery
} from "src/app/util/pagination";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import {
  IAuthor,
  IAuthorListItem,
  IGoodreadsAuthorResponse,
  IGoodreadsAuthorSearchResponse
} from "../types/catalog";

@Injectable()
export class AuthorService {
  apiUrl = `${environment.api}/catalog/authors`;

  constructor(private httpClient: HttpClient) {}

  getAll(query?: IPaginationQuery) {
    const queryParams = buildQueryParamsFromPagination(query);

    return this.httpClient.get<IPaginatedResource<IAuthorListItem>>(
      `${this.apiUrl}`,
      {
        params: queryParams
      }
    );
  }

  getById(authorId: string) {
    return this.httpClient.get<IAuthor>(`${this.apiUrl}/${authorId}`);
  }

  create(authorData: IAuthor) {
    return this.httpClient.post<IAuthor>(`${this.apiUrl}`, authorData);
  }

  edit(authorId: string, authorData: IAuthor) {
    return this.httpClient.patch<IAuthor>(
      `${this.apiUrl}/${authorId}`,
      authorData
    );
  }

  delete(authorId: string) {
    return this.httpClient.delete(`${this.apiUrl}/${authorId}`);
  }

  searchInGoodReadsByName(authorName: string) {
    const api = `${environment.api}/catalog/goodreads`;

    return this.httpClient.get(`${api}/search/authors/${authorName}`).pipe(
      flatMap((searchResponse: IGoodreadsAuthorSearchResponse) => {
        return this.httpClient.get<IGoodreadsAuthorResponse>(
          `${api}/authors/${searchResponse.id}`
        );
      })
    );
  }
}
