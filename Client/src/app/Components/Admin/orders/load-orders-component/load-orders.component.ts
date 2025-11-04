import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../../Models/Interfaces/Orders';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { UserParams } from '../../../../Models/Classes/UserParams';
import { OrdersService } from '../../../../Services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { MedicineService } from '../../../../Services/medicine.service';
import { firstValueFrom } from 'rxjs';
import { Paginator } from "primeng/paginator";
import { ConfirmPopup } from "primeng/confirmpopup";
import { ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-load-orders',
  imports: [Paginator, ConfirmPopup, CommonModule, FormsModule],
  templateUrl: './load-orders.component.html',
  styleUrl: './load-orders.component.css',
  providers: [ConfirmationService]
})
export class LoadOrdersComponent implements OnInit {

  orders: Orders[] = [];

  pagination!: Pagination;

  userParams: UserParams = new UserParams();

  constructor(private orderService: OrdersService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) {}

  async ngOnInit() {

    await this.loadOrders();
  }

  async loadOrders() {

    let loadedOrders = await firstValueFrom(this.orderService.getOrders(this.userParams));

    this.orders = loadedOrders.result;

    this.pagination = loadedOrders.pagination;
  }

  async approveOrder(order: Orders){

    await firstValueFrom(this.orderService.changeOrderStatus(order, true));

    this.toastr.info("Order is approved");
  }


  async onPageChange(event: any) {

    this.userParams.pageNumber = event.page + 1;

    this.userParams.pageSize = event?.rows;

    await this.loadOrders();
  }

  async confirmApproval(event: Event, order: Orders) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Approve this order?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'Approve',
          severity: 'danger'
      },
      accept: async () => {
        await this.approveOrder(order);
      },
      reject: () => {
          this.toastr.error("You have rejected!");
      }
    });
  }

}
