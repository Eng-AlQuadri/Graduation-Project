import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PatientInvoiceDetailDialogService } from '../../Services/patient-invoice-detail-dialog.service';
import { InvoiceDetail } from '../../Models/Interfaces/InvoiceDetail';
import { Invoice } from '../../Models/Interfaces/Invoice';

@Component({
  selector: 'app-patient-invoice-detail',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './patient-invoice-detail.component.html',
  styleUrl: './patient-invoice-detail.component.css'
})

export class PatientInvoiceDetailComponent implements OnInit {

  visible: boolean = false;

  invoice!: Invoice;

  constructor(private detailDialog: PatientInvoiceDetailDialogService) {}

  ngOnInit(): void {
    this.detailDialog.dialogVisibile$.subscribe(isVisible => {
      this.visible = isVisible;
    })

    this.detailDialog.currentInvoice$.subscribe(detail => {
      this.invoice = detail!
    })
  }

  closeDialog() {
    this.detailDialog.hideDialog();
  }
}
