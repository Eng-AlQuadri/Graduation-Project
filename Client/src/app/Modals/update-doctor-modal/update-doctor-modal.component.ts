import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Doctor } from '../../Models/Interfaces/Doctor';
import { UpdateDoctorDialogService } from '../../Services/update-doctor-dialog.service';

@Component({
  selector: 'app-update-doctor-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],  templateUrl: './update-doctor-modal.component.html',
  styleUrl: './update-doctor-modal.component.css'
})
export class UpdateDoctorModalComponent implements OnInit {

  @Output() doctorUpdated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  initialDoctor!: Doctor;

  doctor!: Doctor;

  constructor(private updateDoctorDialogService: UpdateDoctorDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.updateDoctorDialogService.dialogVisible$.subscribe( isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current doctor
    this.updateDoctorDialogService.selectedDoctor$.subscribe(doctor => {
      this.doctor = doctor!;
      this.initialDoctor = JSON.parse(JSON.stringify(doctor)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.initialDoctor });
    this.updateDoctorDialogService.hideDialog();
  }

  updateDoctor() {
    this.doctorUpdated.emit(this.doctor);
    this.updateDoctorDialogService.hideDialog();
    this.editForm.reset(this.doctor);
  }

}

