import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.development';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Pagination } from '../Models/Interfaces/Pagination';
import { Patient } from '../Models/Interfaces/Patient';
import { PatientParams } from '../Models/Interfaces/PatientParams';
import { DoctorParams } from '../Models/Interfaces/DoctorParams';
import { Doctor } from '../Models/Interfaces/Doctor';
import { UpdateDoctor } from '../Models/Interfaces/UpdateDoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  baseUrl: string = environment.API_URL;


  http: HttpClient = inject(HttpClient);


  constructor() {}


  getDoctors(doctorParams: DoctorParams): Observable<ApiResponse<Pagination<Doctor>>> {

    let params = this.buildParams(doctorParams);

    return this.http.get<ApiResponse<Pagination<Doctor>>>(this.baseUrl + 'doctor', {params});
  }


  createDoctor(newDoctor: Doctor) {

    return this.http.post<ApiResponse<Patient>>(this.baseUrl + 'doctor', newDoctor);
  }


  updateDoctor(udoctor: UpdateDoctor): Observable<ApiResponse<null>> {

    return this.http.put<ApiResponse<null>>(this.baseUrl + 'doctor', udoctor);
  }


  deleteDoctor(id: number): Observable<ApiResponse<null>> {

    return this.http.delete<ApiResponse<null>>(this.baseUrl + 'doctor/' + id);
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
