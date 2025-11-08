import { inject, Injectable } from "@angular/core";
import { environment } from "../Environments/environment.development";
import { UserParams } from "../Models/Classes/UserParams";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { PaginatedResult } from "../Models/Classes/PaginatedResult";
import { Purchase } from "../Models/Interfaces/Purchase";
import { getPaginatedResult, getPaginationHeaders } from "./PaginationHelper";
import { CreatePurchase } from "../Models/Interfaces/CreatePurchase";
import { PurchaseParams } from "../Models/Interfaces/PurchaseParams";
import { ApiResponse } from "../Models/Interfaces/ApiResponse";
import { Pagination } from "../Models/Interfaces/Pagination";

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  baseUrl = environment.API_URL;

  http: HttpClient = inject(HttpClient);

  constructor() { }


  getPurchases(purchaseParams: PurchaseParams): Observable<ApiResponse<Pagination<Purchase>>> {

    let params = this.buildParams(purchaseParams);

    return this.http.get<ApiResponse<Pagination<Purchase>>>(this.baseUrl + 'purchase', {params});
  }


  createPurchase(newPurchase: CreatePurchase): Observable<ApiResponse<Purchase>> {

    return this.http.post<ApiResponse<Purchase>>(this.baseUrl + 'purchase', newPurchase);
  }


  private buildParams(p: { search?: string; sort?: string; pageSize: number; pageNumber: number }): HttpParams {

    let params = new HttpParams();

    if (p.search) params = params.set('search', p.search);

    if (p.sort) params = params.set('sort', p.sort);

    return params
      .set('pageSize', p.pageSize)
      .set('pageIndex', p.pageNumber);
  }
}
