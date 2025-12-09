import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { Doctor } from '../../../Models/Interfaces/Doctor';
import { DoctorParams } from '../../../Models/Interfaces/DoctorParams';
import { Pagination } from '../../../Models/Interfaces/Pagination';
import { UpdateDoctor } from '../../../Models/Interfaces/UpdateDoctor';
import { CreateDoctorDialogService } from '../../../Services/create-doctor-dialog.service';
import { DoctorsService } from '../../../Services/doctors.service';
import { UpdateDoctorDialogService } from '../../../Services/update-doctor-dialog.service';
import { DeliveryService } from '../../../Services/delivery.service';
import { DeliveryParams } from '../../../Models/Interfaces/DeliveryParams';
import { Delivery } from '../../../Models/Interfaces/Delivery';

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
      = await firstValueFrom(this.deliveryService.getDeliveries(this.deliveryParams));

    this.pagination = response.data;

    this.deliveries = response.data.items;
  }


  async onPageChange(event: any): Promise<void> {

    this.deliveryParams.pageNumber = event.page + 1;

    this.deliveryParams.pageSize = event?.rows;

    await this.loadDeliveries();
  }
}


