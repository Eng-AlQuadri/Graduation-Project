import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.development';
import { PaginatedResult } from '../Models/Classes/PaginatedResult';
import { UserParams } from '../Models/Classes/UserParams';
import { getPaginationHeaders, getPaginatedResult } from './PaginationHelper';
import { Supplier } from '../Models/Interfaces/Supplier';
import { Purchase } from '../Models/Interfaces/Purchase';
import { UpdateSupplier } from '../Models/Interfaces/UpdateSupplier';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  userParams: UserParams;

  baseUrl: string = environment.API_URL;

  supplierCache!: Supplier[];

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }


  getSuppliers(userParams: UserParams): Observable<PaginatedResult<Supplier[]>> {

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return getPaginatedResult<Supplier[]>(this.baseUrl + 'supplier', params, this.http);
  }


  getSupplier(supplierId: number): Observable<Supplier> {

    return this.http.get<Supplier>(this.baseUrl + 'supplier/' + supplierId);
  }


  getSupplierPurchases(id: number) : Observable<Purchase> {

    return this.http.get<Purchase>(this.baseUrl + 'purchase/supplier/' + id);
  }


  createSupplier(newSupplier: Supplier): Observable<Supplier> {

    return this.http.post<Supplier>(this.baseUrl + 'supplier', newSupplier);
  }


  updateSupplier(usupplier: UpdateSupplier): Observable<UpdateSupplier> {

    return this.http.put<UpdateSupplier>(this.baseUrl + 'supplier', usupplier);
  }


  deleteSupplier(id: number): Observable<void> {

    return this.http.delete<void>(this.baseUrl + 'supplier/' + id);
  }


  setUserParams(params: UserParams): void {
    this.userParams = params;
  }


  getUserParams(): UserParams {
    return this.userParams;
  }


  resetUserParams(): UserParams {
    this.userParams = new UserParams();
    return this.userParams
  }
}
