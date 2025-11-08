import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Patient } from "../Models/Interfaces/Patient";
import { Observable } from "rxjs";
import { PatientsService } from "../Services/patients.service";
import { Invoice } from "../Models/Interfaces/Invoice";
import { InvoiceParams } from "../Models/Interfaces/InvoiceParams";
import { ApiResponse } from "../Models/Interfaces/ApiResponse";
import { Pagination } from "../Models/Interfaces/Pagination";

@Injectable({
  providedIn: 'root'
})

export class PatientDetailResolver implements Resolve<ApiResponse<Pagination<Invoice>>> {

  constructor(private patientService: PatientsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ApiResponse<Pagination<Invoice>>> {
    return this.patientService.getPatientInvoices(parseInt(route.paramMap.get('id')!), new InvoiceParams());
  }
}
