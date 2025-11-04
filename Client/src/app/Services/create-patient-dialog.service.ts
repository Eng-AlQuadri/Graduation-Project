import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePatientDialogService {

  private dialogVisible = new BehaviorSubject<boolean>(false);

  public dialogVisible$ = this.dialogVisible.asObservable();

  constructor() { }

  showDialog(): void {
    this.dialogVisible.next(true);
  }

  hideDialog(): void {
    this.dialogVisible.next(false);
  }
}
