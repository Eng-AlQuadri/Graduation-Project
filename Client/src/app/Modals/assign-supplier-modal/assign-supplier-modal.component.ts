import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Medicine } from '../../Models/Interfaces/Medicine';
import { CreateMedicineDialogService } from '../../Services/create-medicine-dialog.service';
import { AssignSupplierDialogService } from '../../Services/assign-supplier-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-assign-supplier-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './assign-supplier-modal.component.html',
  styleUrl: './assign-supplier-modal.component.css'
})
export class AssignSupplierModalComponent implements OnInit {

  @Output() supplierAssigned = new EventEmitter<any>();

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

  initialMedicine!: Medicine;

  constructor(private assignSupplierDialog: AssignSupplierDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.assignSupplierDialog.dialogVisibility$.subscribe( isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current medicine
    this.assignSupplierDialog.selectedMedicine$.subscribe(medicine => {
      this.medicine = medicine!;
      this.initialMedicine = JSON.parse(JSON.stringify(medicine)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.initialMedicine });
    // this.visible = false;
    this.assignSupplierDialog.hideDialog();
  }

  updateMedicine() {
    this.supplierAssigned.emit(this.medicine);
    // this.visible = false;
    this.assignSupplierDialog.hideDialog();
    this.editForm.reset(this.medicine);
  }
}
