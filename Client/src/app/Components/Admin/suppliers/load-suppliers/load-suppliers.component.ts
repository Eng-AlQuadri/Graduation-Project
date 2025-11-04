import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { UserParams } from '../../../../Models/Classes/UserParams';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { Supplier } from '../../../../Models/Interfaces/Supplier';
import { SuppliersService } from '../../../../Services/suppliers.service';
import { UpdateSupplier } from '../../../../Models/Interfaces/UpdateSupplier';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { CreateSupplierModalComponent } from "../../../../Modals/create-supplier-modal/create-supplier-modal.component";
import { CreateSupplierDialogService } from '../../../../Services/create-supplier-dialog.service';
import { UpdateSupplierModalComponent } from "../../../../Modals/update-supplier-modal/update-supplier-modal.component";
import { UpdateSupplierDialogService } from '../../../../Services/update-supplier-dialog.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-load-suppliers',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    PaginatorModule,
    CreateSupplierModalComponent,
    UpdateSupplierModalComponent
],
  templateUrl: './load-suppliers.component.html',
  styleUrl: './load-suppliers.component.css',
  providers: [ConfirmationService]
})
export class LoadSuppliersComponent {

  suppliers!: Supplier[];
  pagination!: Pagination;
  userParams: UserParams = new UserParams();

  constructor(private supplierService: SuppliersService, private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private updateSupplierDialog: UpdateSupplierDialogService,
    private createSupplierDialog: CreateSupplierDialogService
  ) {}


  async ngOnInit() {

    const fromPurchases = history.state.fromPurchases; //custom flag

    if (!fromPurchases) {

      await this.loadSuppliers();

    } else {

      this.suppliers = [...this.supplierService.supplierCache];
    }

  }


  async loadSuppliers(): Promise<void> {

    this.supplierService.setUserParams(this.userParams);

    let response = await firstValueFrom(this.supplierService.getSuppliers(this.userParams));

    this.pagination = response.pagination;

    this.suppliers = response.result;

    this.supplierService.supplierCache = [...response.result];
  }


  async loadSupplier(id: number): Promise<void> {

    await firstValueFrom(this.supplierService.getSupplierPurchases(id));
  }


  async createSupplier(newSupplier: Supplier): Promise<void> {

    let response: Supplier = await firstValueFrom(this.supplierService.createSupplier(newSupplier));

    this.suppliers.unshift(response);

    this.supplierService.supplierCache.unshift(response);

    this.toastr.success("Created successfully");
  }


  async updateSupplier(updatedSupplier: Supplier): Promise<void> {

    let updatedSupplierDto: UpdateSupplier = {
      updateSupplierId: updatedSupplier.id,
      userName: updatedSupplier.userName,
      email: updatedSupplier.email,
      phoneNumber: updatedSupplier.phoneNumber
    };

    await firstValueFrom(this.supplierService.updateSupplier(updatedSupplierDto));

    this.supplierService.supplierCache = [...this.suppliers];

    this.toastr.success("Updated Successfully");
  }


  async deleteSupplier(id: number): Promise<void> {

    try {

      await firstValueFrom(this.supplierService.deleteSupplier(id));

      this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);

      this.supplierService.supplierCache = [...this.suppliers];

      this.toastr.success("Deleted Successfully");

    } catch {

      this.toastr.error("Failed, this recored connected to another records");
    }

  }


  confirmDelete(event: Event, supplierId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger'
      },
      accept: async () => {
        await this.deleteSupplier(supplierId);
      },
      reject: () => {
          this.toastr.error("You have rejected!");
      }
  });
  }


  showUpdateDialog(supplier: Supplier) {
    this.updateSupplierDialog.showDialog(supplier);
  }


  showCreateDialog() {
    this.createSupplierDialog.showDialog();
  }


  async onPageChange(event: any): Promise<void> {
    this.userParams.pageNumber = event.page + 1;
    this.userParams.pageSize = event?.rows;
    this.supplierService.setUserParams(this.userParams);
    await this.loadSuppliers();
  }
}
