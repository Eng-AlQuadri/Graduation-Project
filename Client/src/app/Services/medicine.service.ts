import { Injectable } from "@angular/core";
import { UserParams } from "../Models/Classes/UserParams";
import { environment } from "../Environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { PaginatedResult } from "../Models/Classes/PaginatedResult";
import { Medicine } from "../Models/Interfaces/Medicine";
import { getPaginatedResult, getPaginationHeaders } from "./PaginationHelper";
import { UpdateMedicine } from "../Models/Interfaces/UpdateMedicine";

@Injectable({
  providedIn: 'root'
})

export class MedicineService {

  userParams: UserParams;

  baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }

  getMedicines(userParams: UserParams): Observable<PaginatedResult<Medicine[]>> {

    let params: HttpParams = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return getPaginatedResult<Medicine[]>(this.baseUrl + 'medicine', params, this.http);
  }

  createMedicine(newMedicine: Medicine): Observable<Medicine> {

    return this.http.post<Medicine>(this.baseUrl + 'medicine', newMedicine);
  }

  updateMedicine(medicine: UpdateMedicine) {

    return this.http.put(this.baseUrl + 'medicine', medicine);
  }

  removeMedicineFromSupplier(medicineId: number, supplierId: number) {

    return this.http.post(this.baseUrl + `medicine/remove/${medicineId}/supplier/${supplierId}`, {});

  }

  assignSupplierToMedicine(medicineId: number, SupplierId: number) {

    return this.http.post(this.baseUrl + `medicine/assign/${medicineId}/supplier/${SupplierId}`, {});

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
