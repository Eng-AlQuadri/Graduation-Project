import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Medicine } from '../../Models/Interfaces/Medicine';
import { UpdateMedicineDialogService } from '../../Services/update-medicine-dialog.service';
import { InsuranceCompany } from '../../Models/Interfaces/InsuranceCompany';
import { UpdateCompanyDialogService } from '../../Services/update-company-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-update-company-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-company-modal.component.html',
  styleUrl: './update-company-modal.component.css'
})
export class UpdateCompanyModalComponent implements OnInit {

  @Output() companyUpdated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  initialCompany!: InsuranceCompany;

  company!: InsuranceCompany;

  constructor(private updateCompanyDialog: UpdateCompanyDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.updateCompanyDialog.dialogVisibility$.subscribe( isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current medicine
    this.updateCompanyDialog.selectedCompany$.subscribe(company => {
      this.company = company!;
      this.initialCompany = JSON.parse(JSON.stringify(company)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.company });
    this.updateCompanyDialog.hideDialog();
  }

  updateCompany() {
    this.companyUpdated.emit(this.company);
    this.updateCompanyDialog.hideDialog();
    this.editForm.reset(this.company);
  }
}
