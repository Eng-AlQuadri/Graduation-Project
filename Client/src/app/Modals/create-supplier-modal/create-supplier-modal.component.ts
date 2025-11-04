import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Supplier } from '../../Models/Interfaces/Supplier';
import { CreateSupplierDialogService } from '../../Services/create-supplier-dialog.service';

@Component({
  selector: 'app-create-supplier-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-supplier-modal.component.html',
  styleUrl: './create-supplier-modal.component.css'
})
export class CreateSupplierModalComponent implements OnInit {

  @Output() supplierCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  supplier: Supplier = {
    id:0,
    userName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private createSupplierDialog: CreateSupplierDialogService) {}

  ngOnInit(): void {
    this.createSupplierDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createSupplierDialog.hideDialog();
    this.editForm.reset();
  }

  createSupplier(): void {
    this.supplierCreated.emit(this.supplier);
    this.createSupplierDialog.hideDialog();
  }

}
