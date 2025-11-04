import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Patient } from '../../Models/Interfaces/Patient';
import { CreatePatientDialogService } from '../../Services/create-patient-dialog.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-patient-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-patient-modal.component.html',
  styleUrl: './create-patient-modal.component.css'
})
export class CreatePatientModalComponent implements OnInit {

  @Output() patientCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  patient: Patient = {
    id:0,
    userName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private createPatientDialog: CreatePatientDialogService) {}

  ngOnInit(): void {
    this.createPatientDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createPatientDialog.hideDialog();
    this.editForm.reset();
  }

  createPatient(): void {
    this.patientCreated.emit(this.patient);
    this.createPatientDialog.hideDialog();
  }

}
