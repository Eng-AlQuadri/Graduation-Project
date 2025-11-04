import { Injectable } from '@angular/core';
import { UserParams } from '../Models/Classes/UserParams';
import { environment } from '../Environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { PaginatedResult } from '../Models/Classes/PaginatedResult';
import { Observable } from 'rxjs';
import { Orders } from '../Models/Interfaces/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  userParams: UserParams;

  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams;
  }

  getOrders(userParams: UserParams): Observable<PaginatedResult<Orders[]>> {

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return getPaginatedResult<Orders[]>(this.baseUrl + 'orders', params, this.http);
  }

  changeOrderStatus(order: Orders, approval: boolean){

    // if (order.approved == true) return; // don't modified approved order // make it in serve

    let modifiedOrder = {...order, approval: true}

    return this.http.post<Orders>(this.baseUrl + 'orders', modifiedOrder);
  }
}
