import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.development';
import { PaginatedResult } from '../Models/Classes/PaginatedResult';
import { UserParams } from '../Models/Classes/UserParams';
import { getPaginationHeaders, getPaginatedResult } from './PaginationHelper';
import { Supplier } from '../Models/Interfaces/Supplier';
import { Purchase } from '../Models/Interfaces/Purchase';
import { UpdateSupplier } from '../Models/Interfaces/UpdateSupplier';
import { SupplierParams } from '../Models/Interfaces/SupplierParams';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Pagination } from '../Models/Interfaces/Pagination';
import { PurchaseParams } from '../Models/Interfaces/PurchaseParams';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  supplierParams: SupplierParams;

  baseUrl: string = environment.API_URL;

  supplierCache!: Supplier[];

  constructor(private http: HttpClient) {
    this.supplierParams = new SupplierParams();
  }


  getSuppliers(supplierParams: SupplierParams): Observable<ApiResponse<Pagination<Supplier>>> {

    let params = this.buildParams(supplierParams);

    return this.http.get<ApiResponse<Pagination<Supplier>>>(this.baseUrl + 'supplier', {params});
  }


  getSupplier(supplierId: number): Observable<ApiResponse<Supplier>> {

    return this.http.get<ApiResponse<Supplier>>(this.baseUrl + 'supplier/' + supplierId);
  }


  getSupplierPurchases(id: number, purchaseParams: PurchaseParams) : Observable<ApiResponse<Pagination<Purchase>>> {

    let params = this.buildParams(purchaseParams);

    return this.http.get<ApiResponse<Pagination<Purchase>>>(this.baseUrl + 'purchase/supplier/' + id, {params});
  }


  createSupplier(newSupplier: Supplier): Observable<ApiResponse<Supplier>> {

    return this.http.post<ApiResponse<Supplier>>(this.baseUrl + 'supplier', newSupplier);
  }


  updateSupplier(usupplier: UpdateSupplier): Observable<ApiResponse<null>> {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'supplier', usupplier);
  }


  deleteSupplier(id: number): Observable<ApiResponse<null>> {

    return this.http.delete<ApiResponse<null>>(this.baseUrl + 'supplier/' + id);
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
