import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../Models/Interfaces/Invoice';

@Injectable({
  providedIn: 'root'
})
export class PatientInvoiceDetailDialogService {

  private dialogVisibile = new BehaviorSubject<boolean>(false);
  private currentInvoice = new BehaviorSubject<Invoice | null>(null);

  dialogVisibile$ = this.dialogVisibile.asObservable();
  currentInvoice$ = this.currentInvoice.asObservable();

  constructor() { }

  showDialog(invoice: Invoice) {
    this.currentInvoice.next(invoice);
    this.dialogVisibile.next(true);
  }

  hideDialog() {
    //this.currentInvoice.next(null);
    this.dialogVisibile.next(false);
  }
}
