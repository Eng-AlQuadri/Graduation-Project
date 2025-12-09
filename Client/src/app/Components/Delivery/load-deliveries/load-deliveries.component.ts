import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { Delivery } from '../../../Models/Interfaces/Delivery';
import { DeliveryParams } from '../../../Models/Interfaces/DeliveryParams';
import { Pagination } from '../../../Models/Interfaces/Pagination';
import { DeliveryService } from '../../../Services/delivery.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-load-deliveries',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    PaginatorModule,
    DatePipe
  ],
  templateUrl: './load-deliveries.component.html',
  styleUrl: './load-deliveries.component.css',
  providers: [ConfirmationService]
})
export class LoadDeliveriesComponent implements OnInit {

  deliveries: Delivery[] = [];
  pagination!: Pagination<Delivery>;
  deliveryParams: DeliveryParams = new DeliveryParams();


  constructor(private deliveryService: DeliveryService, private toastrService: ToastrService,
        private confirmationService: ConfirmationService,
  ) {}


  async ngOnInit(): Promise<void> {

    await this.loadDeliveries();
  }


  async completeDelivery(deliveryId: number) {

    await firstValueFrom(this.deliveryService.completeDelivery(deliveryId));

    this.toastrService.success("Done Successfully");
  }


  async loadDeliveries(): Promise<void> {

    let response: ApiResponse<Pagination<Delivery>>
      = await firstValueFrom(this.deliveryService.getDeliveriesByWorker(this.deliveryParams));

    this.pagination = response.data;

    this.deliveries = response.data.items;
  }


  confirmComplete(event: Event, deliveryId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to complete this delivery?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'Complete',
          severity: 'danger'
      },
      accept: async () => {
        await this.completeDelivery(deliveryId);
      },
      reject: () => {
          this.toastrService.error("You have rejected!");
      }
  });
  }


  async onPageChange(event: any): Promise<void> {

    this.deliveryParams.pageNumber = event.page + 1;

    this.deliveryParams.pageSize = event?.rows;

    await this.loadDeliveries();
  }
}


