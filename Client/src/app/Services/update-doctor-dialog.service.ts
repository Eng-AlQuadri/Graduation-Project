import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../Models/Interfaces/Patient';
import { Doctor } from '../Models/Interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class UpdateDoctorDialogService {

  private dialogVisible = new BehaviorSubject<boolean>(false);
  private selectedDoctor = new BehaviorSubject<Doctor | null>(null);

  public dialogVisible$ = this.dialogVisible.asObservable();
  public selectedDoctor$ = this.selectedDoctor.asObservable();

  constructor() { }

  showDialog(doctor: Doctor): void {
    this.selectedDoctor.next(doctor);
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.selectedDoctor.next(null);
    this.dialogVisible.next(false);
  }
}
