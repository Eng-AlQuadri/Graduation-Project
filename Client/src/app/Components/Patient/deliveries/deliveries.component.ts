import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../../Models/Interfaces/Delivery';
import { Pagination } from '../../../Models/Interfaces/Pagination';
import { DeliveryParams } from '../../../Models/Interfaces/DeliveryParams';
import { DeliveryService } from '../../../Services/delivery.service';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { firstValueFrom } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-deliveries',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    PaginatorModule,
    DatePipe
  ],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css'
})
export class DeliveriesComponent implements OnInit {

  deliveries: Delivery[] = [];
  pagination!: Pagination<Delivery>;
  deliveryParams: DeliveryParams = new DeliveryParams();


  constructor(private deliveryService: DeliveryService
  ) {}


  async ngOnInit(): Promise<void> {

    await this.loadDeliveries();
  }


  async loadDeliveries(): Promise<void> {

    let response: ApiResponse<Pagination<Delivery>>
      = await firstValueFrom(this.deliveryService.getDeliveriesByPatient(this.deliveryParams));

    this.pagination = response.data;

    this.deliveries = response.data.items;
  }


  async onPageChange(event: any): Promise<void> {

    this.deliveryParams.pageNumber = event.page + 1;

    this.deliveryParams.pageSize = event?.rows;

    await this.loadDeliveries();
  }
}


