import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Supplier } from '../../Models/Interfaces/Supplier';
import { UpdateSupplierDialogService } from '../../Services/update-supplier-dialog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-update-supplier-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-supplier-modal.component.html',
  styleUrl: './update-supplier-modal.component.css'
})
export class UpdateSupplierModalComponent implements OnInit {

  @Output() supplierUpdated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  initialSupplier!: Supplier;

  supplier!: Supplier;

  constructor(private updateSupplierDialog: UpdateSupplierDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.updateSupplierDialog.dialogVisible$.subscribe(isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current supplier
    this.updateSupplierDialog.selectedSupplier$.subscribe(supplier => {
      this.supplier = supplier!;
      this.initialSupplier = JSON.parse(JSON.stringify(supplier)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.initialSupplier });
    this.updateSupplierDialog.hideDialog();
  }

  updateSupplier() {
    this.supplierUpdated.emit(this.supplier);
    this.updateSupplierDialog.hideDialog();
    this.editForm.reset(this.supplier);
  }
}
