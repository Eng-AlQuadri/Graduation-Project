import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { Pagination } from '../../../Models/Interfaces/Pagination';
import { Doctor } from '../../../Models/Interfaces/Doctor';
import { DoctorParams } from '../../../Models/Interfaces/DoctorParams';
import { DoctorsService } from '../../../Services/doctors.service';
import { UpdateDoctorDialogService } from '../../../Services/update-doctor-dialog.service';
import { CreateDoctorDialogService } from '../../../Services/create-doctor-dialog.service';
import { UpdateDoctor } from '../../../Models/Interfaces/UpdateDoctor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { CreatePatientModalComponent } from '../../../Modals/create-patient-modal/create-patient-modal.component';
import { UpdatePatientModalComponent } from '../../../Modals/update-patient-modal/update-patient-modal.component';
import { CreateDoctorModalComponent } from '../../../Modals/create-doctor-modal/create-doctor-modal.component';
import { UpdateDoctorModalComponent } from '../../../Modals/update-doctor-modal/update-doctor-modal.component';

@Component({
  selector: 'app-doctors',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    UpdateDoctorModalComponent,
    CreateDoctorModalComponent,
    PaginatorModule
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
  providers: [ConfirmationService]
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  pagination!: Pagination<Doctor>;
  doctorParams: DoctorParams = new DoctorParams();


  constructor(private doctorService: DoctorsService, private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private updateDoctorDialogService: UpdateDoctorDialogService,
    private createDoctorDialogService: CreateDoctorDialogService
  ) {}


  async ngOnInit(): Promise<void> {

    await this.loadDoctors();
  }


  async loadDoctors(): Promise<void> {

    let response: ApiResponse<Pagination<Doctor>>
      = await firstValueFrom(this.doctorService.getDoctors(this.doctorParams));

    this.pagination = response.data;

    this.doctors = response.data.items;
  }


  async createDoctor(newDoctor: Doctor): Promise<void> {

    var response: ApiResponse<Doctor> = await firstValueFrom(this.doctorService.createDoctor(newDoctor));

    this.doctors.unshift(response.data);

    this.toastr.success("Created Successfully");
  }


  async updateDoctor(updatedDoctor: Doctor): Promise<void> {

    let updatedDoctorData: UpdateDoctor = {
      updateDoctorId: updatedDoctor.id,
      userName: updatedDoctor.userName,
      email: updatedDoctor.email,
      phoneNumber: updatedDoctor.phoneNumber
    };

    await firstValueFrom(this.doctorService.updateDoctor(updatedDoctorData));

    this.toastr.success("Updated successfully");
  }


  async deleteDoctor(id: number): Promise<void> {

    await firstValueFrom(this.doctorService.deleteDoctor(id));

    this.doctors = this.doctors.filter(x => x.id != id);

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
        await this.deleteDoctor(doctorId);
      },
      reject: () => {
          this.toastr.error("You have rejected!");
      }
  });
  }


  showUpdateDialog(doctor: Doctor) {
    this.updateDoctorDialogService.showDialog(doctor);
  }


  showCreateDialog() {
    this.createDoctorDialogService.showDialog();
  }


  async onPageChange(event: any): Promise<void> {

    this.doctorParams.pageNumber = event.page + 1;

    this.doctorParams.pageSize = event?.rows;

    await this.loadDoctors();
  }
}

