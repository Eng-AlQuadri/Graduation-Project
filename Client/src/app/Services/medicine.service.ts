import { inject, Injectable } from "@angular/core";
import { UserParams } from "../Models/Classes/UserParams";
import { environment } from "../Environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { PaginatedResult } from "../Models/Classes/PaginatedResult";
import { Medicine } from "../Models/Interfaces/Medicine";
import { getPaginatedResult, getPaginationHeaders } from "./PaginationHelper";
import { UpdateMedicine } from "../Models/Interfaces/UpdateMedicine";
import { MedicineParams } from "../Models/Interfaces/MedicineParams";
import { ApiResponse } from "../Models/Interfaces/ApiResponse";
import { Pagination } from "../Models/Interfaces/Pagination";

@Injectable({
  providedIn: 'root'
})

export class MedicineService {

  medicineParams: MedicineParams;

  baseUrl: string = environment.API_URL;

  http: HttpClient = inject(HttpClient);

  constructor() {
    this.medicineParams = new MedicineParams();
  }


  getMedicines(medicineParams: MedicineParams): Observable<ApiResponse<Pagination<Medicine>>> {

    let params = this.buildParams(medicineParams);

    return this.http.get<ApiResponse<Pagination<Medicine>>>(this.baseUrl + 'medicine', {params});
  }


  createMedicine(newMedicine: Medicine): Observable<ApiResponse<Medicine>> {

    return this.http.post<ApiResponse<Medicine>>(this.baseUrl + 'medicine', newMedicine);
  }


  updateMedicine(medicine: UpdateMedicine): Observable<ApiResponse<null>> {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'medicine', medicine);
  }


  removeMedicineFromSupplier(medicineId: number, supplierId: number): Observable<ApiResponse<null>> {

    return this.http.post<ApiResponse<null>>(this.baseUrl + `medicine/remove/${medicineId}/supplier/${supplierId}`, {});
  }


  assignSupplierToMedicine(medicineId: number, SupplierId: number): Observable<ApiResponse<null>> {

    return this.http.post<ApiResponse<null>>(this.baseUrl + `medicine/assign/${medicineId}/supplier/${SupplierId}`, {});
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
