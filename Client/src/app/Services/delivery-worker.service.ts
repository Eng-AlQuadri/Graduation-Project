import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.development';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Doctor } from '../Models/Interfaces/Doctor';
import { DoctorParams } from '../Models/Interfaces/DoctorParams';
import { Pagination } from '../Models/Interfaces/Pagination';
import { DeliveryWorkerParams } from '../Models/Interfaces/DeliveryWorkerParams';
import { DeliveryWorker } from '../Models/Interfaces/DeliveryWorkers';
import { UpdateDeliveryWorker } from '../Models/Interfaces/UpdateDeliveryWorker';

@Injectable({
  providedIn: 'root'
})
export class DeliveryWorkerService {

  baseUrl: string = environment.API_URL;


  http: HttpClient = inject(HttpClient);


  constructor() {}


  getDeliveryWorkers(deliveryWorkerParams: DeliveryWorkerParams): Observable<ApiResponse<Pagination<DeliveryWorker>>> {

    let params = this.buildParams(deliveryWorkerParams);

    return this.http.get<ApiResponse<Pagination<Doctor>>>(this.baseUrl + 'deliveryworker', {params});
  }


  createDeliveryWorker(newDeliveryWorker: DeliveryWorker) {

    return this.http.post<ApiResponse<DeliveryWorker>>(this.baseUrl + 'deliveryworker', newDeliveryWorker);
  }


  updateDeliveryWorker(updateDeliveryWorker: UpdateDeliveryWorker) {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'deliveryworker', updateDeliveryWorker);
  }


  deleteDeliveryWorker(id: number) {

    return this.http.delete<ApiResponse<null>>(this.baseUrl + 'deliveryworker/' + id);
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
