import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../Models/Interfaces/Patient';

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientDialogService {

  private dialogVisible = new BehaviorSubject<boolean>(false);
  private selectedPatient = new BehaviorSubject<Patient | null>(null);

  public dialogVisible$ = this.dialogVisible.asObservable();
  public selectedPatient$ = this.selectedPatient.asObservable();

  constructor() { }

  showDialog(patient: Patient): void {
    this.selectedPatient.next(patient);
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.selectedPatient.next(null);
    this.dialogVisible.next(false);
  }
}
