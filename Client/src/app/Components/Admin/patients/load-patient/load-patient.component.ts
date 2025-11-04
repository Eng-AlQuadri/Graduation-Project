import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../../../Models/Interfaces/Invoice';
import { UserParams } from '../../../../Models/Classes/UserParams';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../../../../Services/patients.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientInvoiceDetailDialogService } from '../../../../Services/patient-invoice-detail-dialog.service';
import { PatientInvoiceDetailComponent } from "../../../../Modals/patient-invoice-detail/patient-invoice-detail.component";

@Component({
  selector: 'app-load-patient',
  imports:
  [
    FormsModule,
    CommonModule,
    PatientInvoiceDetailComponent
  ],
  templateUrl: './load-patient.component.html',
  styleUrl: './load-patient.component.css'
})
export class LoadPatientComponent implements OnInit {

  invoices: Invoice[] = []
  userParams!: UserParams;
  pagination!: Pagination;
  patientId!: number;

  constructor(private router: Router, private route: ActivatedRoute,
    private detailDialog: PatientInvoiceDetailDialogService) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.invoices = data['patient'];
    })

    this.route.params.subscribe(data => {
      this.patientId = data['id'];
    })
  }

  showInvoiceDetail(invoice: Invoice) {
    this.detailDialog.showDialog(invoice);
  }
}
