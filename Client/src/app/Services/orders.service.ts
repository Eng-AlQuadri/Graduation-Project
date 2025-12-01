import { inject, Injectable } from '@angular/core';
import { UserParams } from '../Models/Classes/UserParams';
import { environment } from '../Environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { PaginatedResult } from '../Models/Classes/PaginatedResult';
import { Observable } from 'rxjs';
import { Orders } from '../Models/Interfaces/Orders';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Pagination } from '../Models/Interfaces/Pagination';
import { OrderParams } from '../Models/Interfaces/OrderParams';
import { CreateOrder } from '../Models/Interfaces/CreateOrder';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderParams: OrderParams;

  baseUrl = environment.API_URL;

  accountService: AccountService = inject(AccountService);

  constructor(private http: HttpClient) {
    this.orderParams = new OrderParams();
  }


  getOrders(orderParams: OrderParams): Observable<ApiResponse<Pagination<Orders>>> {

      let params = this.buildParams(orderParams);

      return this.http.get<ApiResponse<Pagination<Orders>>>(this.baseUrl + 'order', {params});
  }


  getPatientOrders(orderParams: OrderParams): Observable<ApiResponse<Pagination<Orders>>> {

      let params = this.buildParams(orderParams);

      return this.http.get<ApiResponse<Pagination<Orders>>>(this.baseUrl + 'order/get-my-orders', {params});
  }


  createOrder(formData: FormData){

    return this.http.post(this.baseUrl + 'order/create-order', formData);
  }


  changeOrderStatus(order: Orders, approval: boolean) {

    // if (order.approved == true) return; // don't modified approved order // make it in server

    let modifiedOrder = {...order, approval: approval}

    return this.http.post<ApiResponse<null>>(this.baseUrl + 'order', modifiedOrder);
  }


  approveOrder(orderId: number) {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'order/approve-order/' + orderId, {});
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
