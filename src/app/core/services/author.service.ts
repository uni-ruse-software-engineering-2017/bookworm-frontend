import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
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

  create(authorData: IAuthor) {
    return this.httpClient
      .post(`${this.apiUrl}`, authorData)
      .pipe(map(response => response as IAuthor));
  }

  edit(authorId: string, authorData: IAuthor) {
    return this.httpClient
      .patch(`${this.apiUrl}/${authorId}`, authorData)
      .pipe(map(response => response as IAuthor));
  }

  searchInGoodReadsByName(authorName: string) {
    const api = `${environment.api}/catalog/goodreads`;

    return this.httpClient.get(`${api}/search/authors/${authorName}`).pipe(
      flatMap((searchResponse: IGoodreadsAuthorSearchResponse) => {
        return this.httpClient
          .get(`${api}/authors/${searchResponse.id}`)
          .pipe(map(author => author as IGoodreadsAuthorResponse));
      })
    );
  }
}
