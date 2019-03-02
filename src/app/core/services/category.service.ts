import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  buildQueryParamsFromPagination,
  IPaginationQuery
} from "src/app/util/pagination";
import { environment } from "src/environments/environment";
import { IPaginatedResource, ITree } from "../types";
import { ICategory } from "../types/catalog";

@Injectable({ providedIn: "root" })
export class CategoryService {
  apiUrl = `${environment.api}/catalog/categories`;

  constructor(private httpClient: HttpClient) {}

  getAll(query?: IPaginationQuery) {
    const queryParams = buildQueryParamsFromPagination(query);

    return this.httpClient.get<IPaginatedResource<ICategory>>(
      `${this.apiUrl}`,
      {
        params: queryParams
      }
    );
  }

  getCategoryTree() {
    return this.httpClient.get<ITree<ICategory>>(`${this.apiUrl}/tree`);
  }

  getById(categoryId: string) {
    return this.httpClient.get<ICategory>(`${this.apiUrl}/${categoryId}`);
  }

  create(categoryData: ICategory) {
    return this.httpClient.post<ICategory>(`${this.apiUrl}`, categoryData);
  }

  edit(categoryId: string, categoryData: Partial<ICategory>) {
    return this.httpClient.patch<ICategory>(
      `${this.apiUrl}/${categoryId}`,
      categoryData
    );
  }

  remove(categoryId: string) {
    return this.httpClient.delete<null>(`${this.apiUrl}/${categoryId}`);
  }
}
