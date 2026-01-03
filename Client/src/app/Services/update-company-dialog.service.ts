import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medicine } from '../Models/Interfaces/Medicine';
import { InsuranceCompany } from '../Models/Interfaces/InsuranceCompany';

@Injectable({
  providedIn: 'root'
})
export class UpdateCompanyDialogService {

  private selectedCompany = new BehaviorSubject<null | InsuranceCompany>(null);
  private dialogVisible = new BehaviorSubject<boolean>(false);

  selectedCompany$ = this.selectedCompany.asObservable();
  dialogVisibility$ = this.dialogVisible.asObservable();

  constructor() {}

  showDialog(company: InsuranceCompany): void {
    this.selectedCompany.next(company);
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.selectedCompany.next(null);
    this.dialogVisible.next(false);
  }
}
