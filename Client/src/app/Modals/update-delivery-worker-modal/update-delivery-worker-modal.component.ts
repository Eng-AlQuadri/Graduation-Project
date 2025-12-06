import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Doctor } from '../../Models/Interfaces/Doctor';
import { UpdateDoctorDialogService } from '../../Services/update-doctor-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DeliveryWorker } from '../../Models/Interfaces/DeliveryWorkers';
import { UpdateDeliveryWorkerDialogService } from '../../Services/update-delivery-worker-dialog.service';

@Component({
  selector: 'app-update-delivery-worker-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-delivery-worker-modal.component.html',
  styleUrl: './update-delivery-worker-modal.component.css'
})
export class UpdateDeliveryWorkerModalComponent implements OnInit {

  @Output() deliveryWorkerUpdated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  initialDeliveryWorker!: DeliveryWorker;

  deliveryWorker!: DeliveryWorker;

  constructor(private updateDeliveryWorkerDialogService: UpdateDeliveryWorkerDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.updateDeliveryWorkerDialogService.dialogVisible$.subscribe( isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current doctor
    this.updateDeliveryWorkerDialogService.selectedDeliveryWorker$.subscribe(deliveryWorker => {
      this.deliveryWorker = deliveryWorker!;
      this.initialDeliveryWorker = JSON.parse(JSON.stringify(deliveryWorker)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.initialDeliveryWorker });
    this.updateDeliveryWorkerDialogService.hideDialog();
  }

  updateDoctor() {
    this.deliveryWorkerUpdated.emit(this.deliveryWorker);
    this.updateDeliveryWorkerDialogService.hideDialog();
    this.editForm.reset(this.deliveryWorker);
  }
}
