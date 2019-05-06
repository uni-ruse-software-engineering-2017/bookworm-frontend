import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  buildQueryParamsFromPagination,
  IPaginationQuery
} from "src/app/util/pagination";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import { IPurchase } from "../types/commerce";

@Injectable({ providedIn: "root" })
export class PurchaseService {
  apiUrl = `${environment.api}/purchases`;

  constructor(private httpClient: HttpClient) {}

  getAll(query?: IPaginationQuery) {
    const queryParams = buildQueryParamsFromPagination(query);

    return this.httpClient.get<IPaginatedResource<IPurchase>>(this.apiUrl, {
      params: queryParams
    });
  }

  getById(purchaseId: string) {
    return this.httpClient.get<IPurchase>(`${this.apiUrl}/${purchaseId}`);
  }
}
