import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Patient } from "../Models/Interfaces/Patient";
import { Observable } from "rxjs";
import { PatientsService } from "../Services/patients.service";
import { Invoice } from "../Models/Interfaces/Invoice";

@Injectable({
  providedIn: 'root'
})

export class PatientDetailResolver implements Resolve<Invoice> {

  constructor(private patientService: PatientsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
    return this.patientService.getPatientInvoices(parseInt(route.paramMap.get('id')!));
  }
}
