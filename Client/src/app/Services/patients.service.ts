import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { Patient } from '../Models/Interfaces/Patient';
import { UserParams } from '../Models/Classes/UserParams';
import { map, Observable, of, take } from 'rxjs';
import { PaginatedResult } from '../Models/Classes/PaginatedResult';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { AccountService } from './account.service';
import { PatientDetail } from '../Models/Interfaces/PatientDetail';
import { UpdatePatient } from '../Models/Interfaces/UpdatePatient';
import { Invoice } from '../Models/Interfaces/Invoice';
import { PatientParams } from '../Models/Interfaces/PatientParams';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Pagination } from '../Models/Interfaces/Pagination';
import { InvoiceParams } from '../Models/Interfaces/InvoiceParams';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {


  baseUrl: string = environment.API_URL;


  http: HttpClient = inject(HttpClient);


  constructor() {}


  getPatients(patientParams: PatientParams): Observable<ApiResponse<Pagination<Patient>>> {

    let params = this.buildParams(patientParams);

    return this.http.get<ApiResponse<Pagination<Patient>>>(this.baseUrl + 'patient', {params});
  }


  getPatientInvoices(id: number, invoiceParams: InvoiceParams)  {

    let params = this.buildParams(invoiceParams);

    return this.http.get<ApiResponse<Pagination<Invoice>>>(this.baseUrl + 'invoice/patient/' + id, {params});
  }


  createPatient(newPatient: Patient): Observable<ApiResponse<Patient>> {

    return this.http.post<ApiResponse<Patient>>(this.baseUrl + 'patient', newPatient);
  }


  updatePatient(upatient: UpdatePatient): Observable<ApiResponse<null>> {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'patient', upatient);
  }


  deletePatient(id: number): Observable<ApiResponse<null>> {

    return this.http.delete<ApiResponse<null>>(this.baseUrl + 'patient/' + id);
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
