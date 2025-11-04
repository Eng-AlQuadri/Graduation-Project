import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Patient } from '../../Models/Interfaces/Patient';
import { UpdatePatientDialogService } from '../../Services/update-patient-dialog.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-patient-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-patient-modal.component.html',
  styleUrl: './update-patient-modal.component.css'
})

export class UpdatePatientModalComponent implements OnInit {

  @Output() patientUpdated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  initialPatient!: Patient;

  patient!: Patient;

  constructor(private updatePatientDialogService: UpdatePatientDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.updatePatientDialogService.dialogVisible$.subscribe( isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current patient
    this.updatePatientDialogService.selectedPatient$.subscribe(patient => {
      this.patient = patient!;
      this.initialPatient = JSON.parse(JSON.stringify(patient)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.initialPatient });
    this.updatePatientDialogService.hideDialog();
  }

  updatePatient() {
    this.patientUpdated.emit(this.patient);
    this.updatePatientDialogService.hideDialog();
    this.editForm.reset(this.patient);
  }

}
