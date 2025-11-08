import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Purchase } from '../../../../Models/Interfaces/Purchase';
import { PurchaseService } from '../../../../Services/purchase.service';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { UserParams } from '../../../../Models/Classes/UserParams';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CreatePurchaseDialogService } from '../../../../Services/create-purchase-dialog.service';
import { CreatePurchaseModalComponent } from "../../../../Modals/create-purchase-modal/create-purchase-modal.component";
import { CreatePurchase } from '../../../../Models/Interfaces/CreatePurchase';
import { ToastrService } from 'ngx-toastr';
import { PaginatorModule } from 'primeng/paginator';
import { MedicineService } from '../../../../Services/medicine.service';
import { firstValueFrom } from 'rxjs';
import { PaginatedResult } from '../../../../Models/Classes/PaginatedResult';
import { PurchaseParams } from '../../../../Models/Interfaces/PurchaseParams';
import { ApiResponse } from '../../../../Models/Interfaces/ApiResponse';

@Component({
  selector: 'app-load-purchases',
  imports: [
    FormsModule,
    CommonModule,
    CreatePurchaseModalComponent,
    PaginatorModule,
    DatePipe
],
  templateUrl: './load-purchases.component.html',
  styleUrl: './load-purchases.component.css'
})
export class LoadPurchasesComponent implements OnInit{

  purchases: Purchase[] = []

  pagination!: Pagination<Purchase>;

  purchaseParams: PurchaseParams = new PurchaseParams();

  constructor(private purchaseService: PurchaseService,
    private createPurchaseDialog: CreatePurchaseDialogService,
    private toastr: ToastrService) {}


  async ngOnInit(): Promise<void> {

    await this.loadPurchases();
  }


  async loadPurchases(): Promise<void> {

    let response: ApiResponse<Pagination<Purchase>>
      = await firstValueFrom(this.purchaseService.getPurchases(this.purchaseParams));

    this.purchases = response.data.items;

    this.pagination = response.data;
  }


  async createPurchase(purchase: CreatePurchase) {

    let response: ApiResponse<Purchase> = await firstValueFrom(this.purchaseService.createPurchase(purchase));

    this.purchases.unshift(response.data);

    this.toastr.success("Created successfully");
  }


  showCreateDialog() {

    this.createPurchaseDialog.showDialog();
  }


  async onPageChange(event: any): Promise<void> {

    this.purchaseParams.pageNumber = event.page + 1;

    this.purchaseParams.pageSize = event?.rows;

    await this.loadPurchases();
  }
}
