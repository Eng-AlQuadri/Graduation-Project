import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Patient } from '../../Models/Interfaces/Patient';
import { CreatePatientDialogService } from '../../Services/create-patient-dialog.service';
import { Register } from '../../Models/Interfaces/Register';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Output() patientCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  patient: Register = {
    userName: '',
    email: '',
    phoneNumber: '',
    password: ''
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
    // this.editForm.reset();
  }

}

