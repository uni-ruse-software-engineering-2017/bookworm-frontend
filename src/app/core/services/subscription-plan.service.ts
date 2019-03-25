import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ISubscriptionPlan } from "../types/commerce";

@Injectable({ providedIn: "root" })
export class SubscriptionPlanService {
  apiUrl = `${environment.api}/subscription-plans`;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ISubscriptionPlan[]>(`${this.apiUrl}`);
  }

  getById(planId: string) {
    return this.httpClient.get<ISubscriptionPlan>(`${this.apiUrl}/${planId}`);
  }

  create(planData: ISubscriptionPlan) {
    return this.httpClient.post<ISubscriptionPlan>(`${this.apiUrl}`, planData);
  }

  edit(bookId: string, planData: ISubscriptionPlan) {
    return this.httpClient.patch<ISubscriptionPlan>(
      `${this.apiUrl}/${bookId}`,
      planData
    );
  }

  delete(planId: string) {
    return this.httpClient.delete<null>(`${this.apiUrl}/${planId}`);
  }
}
