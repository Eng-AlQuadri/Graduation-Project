import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { Dialog } from 'primeng/dialog';
import { OrderParams } from '../../../../Models/Interfaces/OrderParams';
import { OrderDetails, Orders } from '../../../../Models/Interfaces/Orders';
import { OrdersService } from '../../../../Services/orders.service';
import { firstValueFrom, timer } from 'rxjs';
import { environment } from '../../../../Environments/environment.development';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardService } from '../../../../Services/card.service';
import { ToastrService } from 'ngx-toastr';
import { BusyService } from '../../../../Services/busy.service';

@Component({
  selector: 'app-get-my-orders',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PaginatorModule,
    Dialog,
    DatePipe,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
],
  templateUrl: './get-my-orders.component.html',
  styleUrl: './get-my-orders.component.css'
})
export class GetMyOrdersComponent implements OnInit {

  orders: Orders[] = [];

  orderDetails: OrderDetails[] = [];

  fb: FormBuilder = inject(FormBuilder);

  pagination!: Pagination<Orders>;

  orderParams: OrderParams = new OrderParams();

  orderService: OrdersService = inject(OrdersService);

  router: Router = inject(Router);

  toastr: ToastrService = inject(ToastrService);

  busyService: BusyService = inject(BusyService);

  cardService: CardService = inject(CardService);

  detailsVisible: boolean = false;

  requiredOrder: number = 0;

  PayDialogVisibility: boolean = false;

  totalPriceBeforeDiscount: number = 0;

  discountPercentage: number = 0;

  totalPrice: number = 0;

  paymentForm!: FormGroup;


  async ngOnInit() {

    this.paymentForm = this.createPaymentForm();

    await this.loadOrders();

    this.getTotalPrice();

    await this.getTotalPriceAfterDiscount();
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

  createPaymentForm() {
    return this.fb.group({
      cardNo: ['', Validators.required],
      cvc: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      expDate: ['', Validators.required]
    });
  }

  getTotalPrice() {
    this.totalPriceBeforeDiscount = this.orders.reduce((acc, next) => acc + next.totalPrice, 0);
  }

  closeDialog() {
    this.PayDialogVisibility = !this.PayDialogVisibility;
  }


  showPayDialog() {

    this.PayDialogVisibility = !this.PayDialogVisibility;
  }


  loadPrescription(prescriptionUrl: string) {

    window.open(environment.FILE_URL + prescriptionUrl, '_blank');
  }


  async getTotalPriceAfterDiscount() {

    var response = await firstValueFrom(this.cardService.getCards());

    this.discountPercentage = response.data[0].discount;

    var discount = (this.discountPercentage / 100) * this.totalPriceBeforeDiscount;

    var totalPrice = this.totalPriceBeforeDiscount - discount;

    this.totalPrice = totalPrice;
  }


  ShowDetails(orderId: number) {

    this.requiredOrder = orderId;

    this.detailsVisible = !this.detailsVisible;
  }


  pay() {

    this.PayDialogVisibility = false;

    this.busyService.busy();

    timer(3000).subscribe(() => {

      this.busyService.idle();

      this.toastr.success("Paid Successfully");
    })
  }
}
