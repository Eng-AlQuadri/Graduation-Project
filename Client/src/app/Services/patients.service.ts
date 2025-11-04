import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  userParams: UserParams;

  baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }


  getPatients(userParams: UserParams): Observable<PaginatedResult<Patient[]>> {

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return getPaginatedResult<Patient[]>(this.baseUrl + 'patient', params, this.http);
  }

  getPatientInvoices(id: number) : Observable<Invoice> {

    return this.http.get<Invoice>(this.baseUrl + 'invoice/patient/' + id);
  }

  createPatient(newPatient: Patient): Observable<Patient> {

    return this.http.post<Patient>(this.baseUrl + 'patient', newPatient);
  }

  updatePatient(upatient: UpdatePatient): Observable<UpdatePatient> {

    return this.http.put<UpdatePatient>(this.baseUrl + 'patient', upatient);
  }

  deletePatient(id: number): Observable<void> {

    return this.http.delete<void>(this.baseUrl + 'patient/' + id);
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
