import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPaginatedResource } from "../types";
import { IPurchase } from "../types/commerce";

@Injectable({ providedIn: "root" })
export class PurchaseService {
  apiUrl = `${environment.api}/purchases`;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get(this.apiUrl)
      .pipe(map(response => response as IPaginatedResource<IPurchase>));
  }

  getById(purchaseId: string) {
    return this.httpClient.get<IPurchase>(`${this.apiUrl}/${purchaseId}`);
  }
}
