import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { Dialog } from 'primeng/dialog';
import { OrderParams } from '../../../../Models/Interfaces/OrderParams';
import { OrderDetails, Orders } from '../../../../Models/Interfaces/Orders';
import { OrdersService } from '../../../../Services/orders.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../Environments/environment.development';

@Component({
  selector: 'app-get-my-orders',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PaginatorModule,
    Dialog,
    DatePipe
  ],
  templateUrl: './get-my-orders.component.html',
  styleUrl: './get-my-orders.component.css'
})
export class GetMyOrdersComponent implements OnInit {

  orders: Orders[] = [];

  orderDetails: OrderDetails[] = [];

  pagination!: Pagination<Orders>;

  orderParams: OrderParams = new OrderParams();

  orderService: OrdersService = inject(OrdersService);

  router: Router = inject(Router);

  detailsVisible: boolean = false;

  requiredOrder: number = 0;

  async ngOnInit() {

    await this.loadOrders();
  }

  async loadOrders() {

    let response = await firstValueFrom(this.orderService.getPatientOrders(this.orderParams));

    this.orders = response.data.items;

    this.pagination = response.data;
  }

  async onPageChange(event: any): Promise<void> {

    this.orderParams.pageNumber = event.page + 1;

    this.orderParams.pageSize = event?.rows;

    await this.loadOrders();
  }


  loadPrescription(prescriptionUrl: string) {

    window.open(environment.FILE_URL + prescriptionUrl, '_blank');
  }


  ShowDetails(orderId: number) {

    this.requiredOrder = orderId;

    this.detailsVisible = !this.detailsVisible;
  }
}
