import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Medicine } from '../../Models/Interfaces/Medicine';
import { CreateMedicineDialogService } from '../../Services/create-medicine-dialog.service';
import { InsuranceCompany } from '../../Models/Interfaces/InsuranceCompany';
import { CreateCompanyDialogService } from '../../Services/create-company-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-company-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-company-modal.component.html',
  styleUrl: './create-company-modal.component.css'
})
export class CreateCompanyModalComponent implements OnInit {

  @Output() companyCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  company: InsuranceCompany = {
    companyName: '',
    discount: 0,
    id: 0
  };

  constructor(private createCompanyDialog: CreateCompanyDialogService) {}

  ngOnInit(): void {
    this.createCompanyDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createCompanyDialog.hideDialog();
    this.editForm.reset();
  }

  createCompany(): void {
    this.companyCreated.emit(this.company);
    this.createCompanyDialog.hideDialog();
  }

}

