import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { MedicineSelection } from '../../../Models/Interfaces/MedicineSelection';
import { AccountService } from '../../../Services/account.service';
import { MedicineService } from '../../../Services/medicine.service';
import { OrdersService } from '../../../Services/orders.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FileUpload } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { Patient } from '../../../Models/Interfaces/Patient';
import { PatientsService } from '../../../Services/patients.service';
import { PatientParams } from '../../../Models/Interfaces/PatientParams';

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

  patientService: PatientsService = inject(PatientsService);

  orderService: OrdersService = inject(OrdersService);

  accountService: AccountService = inject(AccountService);

  toastr: ToastrService = inject(ToastrService);

  router: Router = inject(Router);

  CreateOrderDialog: boolean = false;

  medicines: MedicineSelection[] = [];

  patients: Patient[] = [];

  prescriptionFile!: File | null;

  displayMedicines: { label: string, value: number }[] = [];


  async ngOnInit() {

    await this.getMedicines();

    await this.getPatients();
  }


  async getMedicines() {

    let response = await firstValueFrom(this.medicineService.getAllMedicines());

    this.medicines = response.data;

    this.displayMedicines = this.medicines.map(m => ({
      label: `${m.name} - $${m.price}`,
      value: m.id
    }));
  }


  async getPatients() {

    let response = await firstValueFrom(this.patientService.getPatientsByDoctor());

    this.patients = response.data;
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
    patientId: ['', Validators.required],
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

    formData.append('patientId', this.createOrderForm.get('patientId')!.value);

    formData.append('address', this.createOrderForm.get('address')!.value);

    const orderDetails = this.createOrderForm.get('orderDetails')!.value.map((item: any) => ({
      medicineId: Number(item.medicineId),
      quantity: Number(item.quantity)
    }));

    formData.append('orderDetails', JSON.stringify(orderDetails));

    if (this.prescriptionFile) {

      formData.append('prescription', this.prescriptionFile);
    }

    await firstValueFrom(this.orderService.createOrderFromDoctor(formData));

    this.toastr.success("Order created successfully");

  }


  onUpload(event: any, fileUpload: any) {

    this.prescriptionFile = event.files[0];
  }


  goToOrdersPage() {

    this.router.navigateByUrl("/doctor/my-orders");
  }
}

