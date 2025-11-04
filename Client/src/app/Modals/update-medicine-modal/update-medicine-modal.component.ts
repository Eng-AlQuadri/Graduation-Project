import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Medicine } from '../../Models/Interfaces/Medicine';
import { UpdateMedicineDialogService } from '../../Services/update-medicine-dialog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-update-medicine-modal',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-medicine-modal.component.html',
  styleUrl: './update-medicine-modal.component.css'
})
export class UpdateMedicineModalComponent implements OnInit {

  @Output() medicineUpdated = new EventEmitter<any>();

  @ViewChild('editForm') editForm!: NgForm;

  visible: boolean = false;

  initialMedicine!: Medicine;

  medicine!: Medicine;

  constructor(private updateMedicineDialog: UpdateMedicineDialogService) {}

  ngOnInit(): void {

    // Subsicribe to dialog visibility
    this.updateMedicineDialog.dialogVisibility$.subscribe( isVisible => {
      this.visible = isVisible;
    })

    // Subsicribe to current medicine
    this.updateMedicineDialog.selectedMedicine$.subscribe(medicine => {
      this.medicine = medicine!;
      this.initialMedicine = JSON.parse(JSON.stringify(medicine)); // Deep copy for reverting changes
    })
  }

  closeDialog() {
    this.editForm.reset({ ...this.initialMedicine });
    this.updateMedicineDialog.hideDialog();
  }

  updateMedicine() {
    this.medicineUpdated.emit(this.medicine);
    this.updateMedicineDialog.hideDialog();
    this.editForm.reset(this.medicine);
  }
}
