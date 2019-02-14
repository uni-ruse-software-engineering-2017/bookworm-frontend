import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import { ICategory } from "../types/catalog";

@Injectable()
export class CategoryService {
  apiUrl = `${environment.api}/catalog/categories`;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.apiUrl}`) as Observable<
      IPaginatedResource<ICategory>
    >;
  }

  getById(categoryId: string) {
    return this.httpClient.get(`${this.apiUrl}/${categoryId}`) as Observable<
      ICategory
    >;
  }
}
