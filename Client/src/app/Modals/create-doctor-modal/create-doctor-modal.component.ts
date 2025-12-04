import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Doctor } from '../../Models/Interfaces/Doctor';
import { CreateDoctorDialogService } from '../../Services/create-doctor-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-doctor-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],  templateUrl: './create-doctor-modal.component.html',
  styleUrl: './create-doctor-modal.component.css'
})
export class CreateDoctorModalComponent implements OnInit {

  @Output() doctorCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  doctor: Doctor = {
    id:0,
    userName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private createDoctorDialog: CreateDoctorDialogService) {}

  ngOnInit(): void {
    this.createDoctorDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createDoctorDialog.hideDialog();
    this.editForm.reset();
  }

  createPatient(): void {
    this.doctorCreated.emit(this.doctor);
    this.createDoctorDialog.hideDialog();
    // this.editForm.reset();
  }

}

