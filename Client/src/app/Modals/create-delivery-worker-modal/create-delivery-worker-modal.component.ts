import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DeliveryWorker } from '../../Models/Interfaces/DeliveryWorkers';
import { CreateDeliveryWorkerDialogService } from '../../Services/create-delivery-worker-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-delivery-worker-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-delivery-worker-modal.component.html',
  styleUrl: './create-delivery-worker-modal.component.css'
})
export class CreateDeliveryWorkerModalComponent implements OnInit {

  @Output() deliveryWorkerCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  deliveryWorker: DeliveryWorker = {
    id:0,
    userName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private createDeliveryWorkerService: CreateDeliveryWorkerDialogService) {}

  ngOnInit(): void {
    this.createDeliveryWorkerService.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createDeliveryWorkerService.hideDialog();
    this.editForm.reset();
  }

  createPatient(): void {
    this.deliveryWorkerCreated.emit(this.deliveryWorker);
    this.createDeliveryWorkerService.hideDialog();
    // this.editForm.reset();
  }

}


