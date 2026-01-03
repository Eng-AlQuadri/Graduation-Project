import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.development';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Invoice } from '../Models/Interfaces/Invoice';
import { InvoiceParams } from '../Models/Interfaces/InvoiceParams';
import { Pagination } from '../Models/Interfaces/Pagination';
import { Patient } from '../Models/Interfaces/Patient';
import { PatientParams } from '../Models/Interfaces/PatientParams';
import { UpdatePatient } from '../Models/Interfaces/UpdatePatient';
import { CompanyParams } from '../Models/Interfaces/CompanyParams';
import { InsuranceCompany } from '../Models/Interfaces/InsuranceCompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl: string = environment.API_URL;


  http: HttpClient = inject(HttpClient);


  constructor() {}


  getCompanies(companyParams: CompanyParams): Observable<ApiResponse<InsuranceCompany[]>> {

    let params = this.buildParams(companyParams);

    return this.http.get<ApiResponse<InsuranceCompany[]>>(this.baseUrl + 'insurancecompany', {params});
  }


  createCompany(newCompany: InsuranceCompany): Observable<ApiResponse<InsuranceCompany>> {

    return this.http.post<ApiResponse<InsuranceCompany>>(this.baseUrl + 'insurancecompany', newCompany);
  }


  updateCompany(ucompany: InsuranceCompany): Observable<ApiResponse<null>> {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'insurancecompany', ucompany);
  }


  deleteCompany(id: number): Observable<ApiResponse<null>> {

    return this.http.delete<ApiResponse<null>>(this.baseUrl + 'insurancecompany/' + id);
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
