import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { UserParams } from '../../../../Models/Classes/UserParams';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { Medicine } from '../../../../Models/Interfaces/Medicine';
import { MedicineService } from '../../../../Services/medicine.service';
import { UpdateMedicine } from '../../../../Models/Interfaces/UpdateMedicine';
import { UpdateMedicineModalComponent } from "../../../../Modals/update-medicine-modal/update-medicine-modal.component";
import { UpdateMedicineDialogService } from '../../../../Services/update-medicine-dialog.service';
import { CreateMedicineModalComponent } from "../../../../Modals/create-medicine-modal/create-medicine-modal.component";
import { CreateMedicineDialogService } from '../../../../Services/create-medicine-dialog.service';
import { AssignSupplierModalComponent } from "../../../../Modals/assign-supplier-modal/assign-supplier-modal.component";
import { AssignSupplierDialogService } from '../../../../Services/assign-supplier-dialog.service';
import { SuppliersService } from '../../../../Services/suppliers.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-load-medicines',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    PaginatorModule,
    UpdateMedicineModalComponent,
    DatePipe,
    CreateMedicineModalComponent,
    AssignSupplierModalComponent
],
  templateUrl: './load-medicines.component.html',
  styleUrl: './load-medicines.component.css',
  providers: [ConfirmationService]
})
export class LoadMedicinesComponent implements OnInit {

  medicines!: Medicine[];
  pagination!: Pagination;
  userParams: UserParams = new UserParams();

  constructor(private medicineService: MedicineService, private toastr: ToastrService,
    private updateMedicineDialog: UpdateMedicineDialogService,
    private createMedicineDialog: CreateMedicineDialogService,
    private confirmationService: ConfirmationService,
    private assignSupplierDialog: AssignSupplierDialogService,
    private supplierService: SuppliersService
  ) {}

  async ngOnInit() {
    await this.loadMedicines();
  }

  async loadMedicines() {

    this.medicineService.setUserParams(this.userParams);

    let response = await firstValueFrom(this.medicineService.getMedicines(this.userParams));

    this.pagination = response.pagination;

    this.medicines = response.result;
  }

  async createMedicine(newMedicine: Medicine) {

    let response: Medicine = await firstValueFrom(this.medicineService.createMedicine(newMedicine));

    this.toastr.success("Created Successfully");

    this.medicines.unshift(response);

  }

  async updateMedicine(updatedMedicine: Medicine) {

    let updatedMedicineDto: UpdateMedicine = {
      updateMedicineId: updatedMedicine.id,
      name: updatedMedicine.name,
      stock: updatedMedicine.stock,
      packing: updatedMedicine.packing,
      expiryDate: updatedMedicine.expiryDate,
      price: updatedMedicine.price
    };

    await firstValueFrom(this.medicineService.updateMedicine(updatedMedicineDto));

    this.toastr.success("Updated Successfully");

  }

  showUpdateDialog(medicine: Medicine) {
    this.updateMedicineDialog.showDialog(medicine);
  }

  showCreateDialog() {
    this.createMedicineDialog.showDialog();
  }

  showAssignDialog(medicine: Medicine) {
    this.assignSupplierDialog.showDialog(medicine);
  }

  async removeMedicineFromSupplier(medicineId: number, supplierId: number) {

    await firstValueFrom(this.medicineService.removeMedicineFromSupplier(medicineId, supplierId));

    this.toastr.success("Removed Successfully");

    const medicineIndex = this.medicines.findIndex(x => x.id === medicineId);

    this.medicines[medicineIndex].supplierName = null!;

    this.medicines[medicineIndex].supplierId = null!
  }

  async assignMedicineToSupplier(medicine: Medicine) {

    let supplier = await firstValueFrom(this.supplierService.getSupplier(medicine.supplierId));

    let medicineIndex = this.medicines.findIndex(x => x.id == medicine.id);

    await firstValueFrom(this.medicineService.assignSupplierToMedicine(medicine.id, supplier.id));

    this.medicines[medicineIndex].supplierName = supplier.userName;

    this.toastr.success("Assigned successfully");
  }

  confirmRemove(event: Event, medicineId: number, supplierId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to remove this supplier?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'Remove',
          severity: 'danger'
      },
      accept: async () => {
        await this.removeMedicineFromSupplier(medicineId, supplierId);
      },
      reject: () => {
        this.toastr.error("You have rejected!");
      }
  });
  }

  async onPageChange(event: any) {

    this.userParams.pageNumber = event.page + 1;

    this.userParams.pageSize = event?.rows;

    this.medicineService.setUserParams(this.userParams);

    await this.loadMedicines();
  }
}
