import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Medicine } from '../../Models/Interfaces/Medicine';
import { CreateMedicineDialogService } from '../../Services/create-medicine-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-medicine-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-medicine-modal.component.html',
  styleUrl: './create-medicine-modal.component.css'
})
export class CreateMedicineModalComponent implements OnInit {

  @Output() medicineCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  medicine: Medicine = {
    name: '',
    expiryDate: new Date(),
    stock: 0,
    price: 0,
    id: 0,
    packing: '',
    supplierName: '',
    supplierId: 0
  };

  constructor(private createMedinceDialog: CreateMedicineDialogService) {}

  ngOnInit(): void {
    this.createMedinceDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createMedinceDialog.hideDialog();
    this.editForm.reset();
  }

  createMedicine(): void {
    this.medicineCreated.emit(this.medicine);
    this.createMedinceDialog.hideDialog();
  }

}
