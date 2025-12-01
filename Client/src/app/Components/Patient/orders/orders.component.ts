import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MedicineService } from '../../../Services/medicine.service';
import { firstValueFrom } from 'rxjs';
import { MedicineSelection } from '../../../Models/Interfaces/MedicineSelection';
import { FileUpload } from 'primeng/fileupload';
import { OrdersService } from '../../../Services/orders.service';
import { AccountService } from '../../../Services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  imports:
  [
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUpload
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);

  medicineService: MedicineService = inject(MedicineService);

  orderService: OrdersService = inject(OrdersService);

  accountService: AccountService = inject(AccountService);

  toastr: ToastrService = inject(ToastrService);

  router: Router = inject(Router);

  CreateOrderDialog: boolean = false;

  medicines: MedicineSelection[] = [];

  prescriptionFile!: File | null;

  displayMedicines: { label: string, value: number }[] = [];


  async ngOnInit() {
    await this.getMedicines();
  }

  async getMedicines() {

    let response = await firstValueFrom(this.medicineService.getAllMedicines());

    this.medicines = response.data;

    this.displayMedicines = this.medicines.map(m => ({
      label: `${m.name} - $${m.price}`,
      value: m.id
    }));
  }

  filterMedicines(event: any) {
  const query = event.query?.toLowerCase() || '';
  this.displayMedicines = this.medicines
    .filter(m => m.name.toLowerCase().includes(query))
    .map(m => ({
      label: `${m.name} - $${m.price.toFixed(2)}`,
      value: m.id
    }));
}

  openCreateOrderDialog() {
    this.CreateOrderDialog = true;
  }


  createOrderForm: FormGroup = this.fb.group({
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    orderDetails: this.fb.array([this.createItem()])
  })


  get items() {
    return this.createOrderForm.get('orderDetails') as FormArray;
  }


  addItem() {
    this.items.push(
      this.fb.group({
        medicineId: ['', Validators.required],
        quantity: ['', Validators.required]
      })
    )
  }


  createItem(): FormGroup{
    return this.fb.group({
        medicineId: ['', Validators.required],
        quantity: ['', Validators.required]
      })
  }


  removeItem(index: number) {
    this.items.removeAt(index);
  }


  closeDialog() {
    this.CreateOrderDialog = false;
  }


  async sendOrder() {

    const formData = new FormData();

    formData.append('address', this.createOrderForm.get('address')!.value);

    const orderDetails = this.createOrderForm.get('orderDetails')!.value.map((item: any) => ({
      medicineId: Number(item.medicineId),
      quantity: Number(item.quantity)
    }));

    formData.append('orderDetails', JSON.stringify(orderDetails));

    if (this.prescriptionFile) {

      formData.append('prescription', this.prescriptionFile);
    }

    await firstValueFrom(this.orderService.createOrder(formData));

    this.toastr.success("Order created successfully");

  }


  onUpload(event: any, fileUpload: any) {

    this.prescriptionFile = event.files[0];
  }


  goToOrdersPage() {
    this.router.navigateByUrl("/patient/get-my-orders");
  }
}
