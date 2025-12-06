import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { Doctor } from '../../../Models/Interfaces/Doctor';
import { Pagination } from '../../../Models/Interfaces/Pagination';
import { DeliveryWorker } from '../../../Models/Interfaces/DeliveryWorkers';
import { DeliveryWorkerParams } from '../../../Models/Interfaces/DeliveryWorkerParams';
import { DeliveryWorkerService } from '../../../Services/delivery-worker.service';
import { UpdateDeliveryWorkerDialogService } from '../../../Services/update-delivery-worker-dialog.service';
import { CreateDeliveryWorkerDialogService } from '../../../Services/create-delivery-worker-dialog.service';
import { UpdateDeliveryWorker } from '../../../Models/Interfaces/UpdateDeliveryWorker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { CreateDoctorModalComponent } from '../../../Modals/create-doctor-modal/create-doctor-modal.component';
import { UpdateDoctorModalComponent } from '../../../Modals/update-doctor-modal/update-doctor-modal.component';
import { UpdateDeliveryWorkerModalComponent } from '../../../Modals/update-delivery-worker-modal/update-delivery-worker-modal.component';
import { CreateDeliveryWorkerModalComponent } from '../../../Modals/create-delivery-worker-modal/create-delivery-worker-modal.component';

@Component({
  selector: 'app-delivery-workers',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    UpdateDeliveryWorkerModalComponent,
    CreateDeliveryWorkerModalComponent,
    PaginatorModule
  ],
  templateUrl: './delivery-workers.component.html',
  styleUrl: './delivery-workers.component.css',
  providers: [ConfirmationService]
})
export class DeliveryWorkersComponent implements OnInit {

  deliveryWorkers: DeliveryWorker[] = [];
  pagination!: Pagination<DeliveryWorker>;
  deliveryWorkerParams: DeliveryWorkerParams = new DeliveryWorkerParams();


  constructor(private deliveryWorkerService: DeliveryWorkerService, private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private updateDeliveryWorkerDialogService: UpdateDeliveryWorkerDialogService,
    private createDeliveryWorkerDialogService: CreateDeliveryWorkerDialogService
  ) {}


  async ngOnInit(): Promise<void> {

    await this.loadDeliveryWorkers();
  }


  async loadDeliveryWorkers(): Promise<void> {

    let response: ApiResponse<Pagination<DeliveryWorker>>
      = await firstValueFrom(this.deliveryWorkerService.getDeliveryWorkers(this.deliveryWorkerParams));

    this.pagination = response.data;

    this.deliveryWorkers = response.data.items;
  }


  async createDeliveryWorker(newDeliveryWorker: DeliveryWorker): Promise<void> {

    var response: ApiResponse<DeliveryWorker> =
      await firstValueFrom(this.deliveryWorkerService.createDeliveryWorker(newDeliveryWorker));

    this.deliveryWorkers.unshift(response.data);

    this.toastr.success("Created Successfully");
  }


  async updateDeliveryWorker(updateDeliveryWorker: DeliveryWorker): Promise<void> {

    let updatedDeliveryWorkerData: UpdateDeliveryWorker = {
      updateDoctorId: updateDeliveryWorker.id,
      userName: updateDeliveryWorker.userName,
      email: updateDeliveryWorker.email,
      phoneNumber: updateDeliveryWorker.phoneNumber
    };

    await firstValueFrom(this.deliveryWorkerService.updateDeliveryWorker(updatedDeliveryWorkerData));

    this.toastr.success("Updated successfully");
  }


  async deleteDeliveryWorker(id: number): Promise<void> {

    await firstValueFrom(this.deliveryWorkerService.deleteDeliveryWorker(id));

    this.deliveryWorkers = this.deliveryWorkers.filter(x => x.id != id);

    this.toastr.success("Deleted successfully");
  }


  confirmDelete(event: Event, doctorId: number) {
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
        await this.deleteDeliveryWorker(doctorId);
      },
      reject: () => {
          this.toastr.error("You have rejected!");
      }
  });
  }


  showUpdateDialog(doctor: Doctor) {
    this.updateDeliveryWorkerDialogService.showDialog(doctor);
  }


  showCreateDialog() {
    this.createDeliveryWorkerDialogService.showDialog();
  }


  async onPageChange(event: any): Promise<void> {

    this.deliveryWorkerParams.pageNumber = event.page + 1;

    this.deliveryWorkerParams.pageSize = event?.rows;

    await this.loadDeliveryWorkers();
  }
}


