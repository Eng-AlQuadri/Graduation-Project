import { Injectable } from "@angular/core";
import { environment } from "../Environments/environment.development";
import { UserParams } from "../Models/Classes/UserParams";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { PaginatedResult } from "../Models/Classes/PaginatedResult";
import { Purchase } from "../Models/Interfaces/Purchase";
import { getPaginatedResult, getPaginationHeaders } from "./PaginationHelper";
import { CreatePurchase } from "../Models/Interfaces/CreatePurchase";

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  userParams: UserParams;

  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }


  getPurchases(userParams: UserParams): Observable<PaginatedResult<Purchase[]>> {

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return getPaginatedResult<Purchase[]>(this.baseUrl + 'purchase', params, this.http);
  }


  createPurchase(newPurchase: CreatePurchase): Observable<Purchase> {

    return this.http.post<Purchase>(this.baseUrl + 'purchase', newPurchase);
  }
}
