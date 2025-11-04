import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Supplier } from '../../Models/Interfaces/Supplier';
import { CreateSupplierDialogService } from '../../Services/create-supplier-dialog.service';
import { CreatePurchase } from '../../Models/Interfaces/CreatePurchase';
import { CreatePurchaseDialogService } from '../../Services/create-purchase-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-purchase-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-purchase-modal.component.html',
  styleUrl: './create-purchase-modal.component.css'
})
export class CreatePurchaseModalComponent implements OnInit {

  @Output() purchaseCreated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  purchase: CreatePurchase = {
    supplierId: null!,
    medicineId: null!,
    quantity: null!,
  };

  constructor(private createPurchaseDialog: CreatePurchaseDialogService) {}

  ngOnInit(): void {
    this.createPurchaseDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })
  }

  closeDialog(): void {
    this.createPurchaseDialog.hideDialog();
    this.editForm.reset();
  }

  createPurchase(): void {
    this.purchaseCreated.emit(this.purchase);
    this.createPurchaseDialog.hideDialog();
  }
}
