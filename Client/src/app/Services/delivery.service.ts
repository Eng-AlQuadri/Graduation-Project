import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.development';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Doctor } from '../Models/Interfaces/Doctor';
import { DoctorParams } from '../Models/Interfaces/DoctorParams';
import { Pagination } from '../Models/Interfaces/Pagination';
import { DeliveryParams } from '../Models/Interfaces/DeliveryParams';
import { Delivery } from '../Models/Interfaces/Delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  baseUrl: string = environment.API_URL;


  http: HttpClient = inject(HttpClient);


  constructor() {}


  getDeliveries(deliveryParams: DeliveryParams): Observable<ApiResponse<Pagination<Delivery>>> {

    let params = this.buildParams(deliveryParams);

    return this.http.get<ApiResponse<Pagination<Delivery>>>(this.baseUrl + 'delivery/get-deliveries', {params});
  }


  getDeliveriesByPatient(deliveryParams: DeliveryParams): Observable<ApiResponse<Pagination<Delivery>>> {

    let params = this.buildParams(deliveryParams);

    return this.http.get<ApiResponse<Pagination<Delivery>>>(this.baseUrl + 'delivery/get-deliveries-by-patient', {params});
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
