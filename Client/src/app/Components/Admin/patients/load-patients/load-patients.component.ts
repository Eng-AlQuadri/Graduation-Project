import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../Models/Interfaces/Patient';
import { Pagination } from '../../../../Models/Interfaces/Pagination';
import { UserParams } from '../../../../Models/Classes/UserParams';
import { PatientsService } from '../../../../Services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { UpdatePatientModalComponent } from '../../../../Modals/update-patient-modal/update-patient-modal.component';
import { UpdatePatientDialogService } from '../../../../Services/update-patient-dialog.service';
import { UpdatePatient } from '../../../../Models/Interfaces/UpdatePatient';
import { CreatePatientModalComponent } from "../../../../Modals/create-patient-modal/create-patient-modal.component";
import { CreatePatientDialogService } from '../../../../Services/create-patient-dialog.service';
import { PaginatorModule } from 'primeng/paginator';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-load-patients',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    UpdatePatientModalComponent,
    CreatePatientModalComponent,
    PaginatorModule
  ],
  templateUrl: './load-patients.component.html',
  styleUrl: './load-patients.component.css',
  providers: [ConfirmationService]
})

export class LoadPatientsComponent implements OnInit {

  patients!: Patient[];
  pagination!: Pagination;
  userParams: UserParams = new UserParams();


  constructor(private patientService: PatientsService, private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private updatePatientDialogService: UpdatePatientDialogService,
    private createPatientDialogService: CreatePatientDialogService
  ) {}


  async ngOnInit(): Promise<void> {

    await this.loadPatients();
  }


  async loadPatients(): Promise<void> {

    let response = await firstValueFrom(this.patientService.getPatients(this.userParams));

    this.pagination = response.pagination;

    this.patients = response.result;
  }


  async loadPatient(id: number): Promise<void> {

    await firstValueFrom(this.patientService.getPatientInvoices(id));
  }


  async createPatient(newPatient: Patient): Promise<void> {

    await firstValueFrom(this.patientService.createPatient(newPatient));

    this.patients.unshift(newPatient);

    this.toastr.success("Created Successfully");
  }


  async updatePatient(updatedPatient: Patient): Promise<void> {

    let updatedPatientData: UpdatePatient = {
      updatePatientId: updatedPatient.id,
      userName: updatedPatient.userName,
      email: updatedPatient.email,
      phoneNumber: updatedPatient.phoneNumber
    };

    await firstValueFrom(this.patientService.updatePatient(updatedPatientData));

    this.toastr.success("Updated successfully");
  }


  async deletePatient(id: number): Promise<void> {

    await firstValueFrom(this.patientService.deletePatient(id));

    this.toastr.success("Deleted successfully");
  }


  confirmDelete(event: Event, patientId: number) {
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
        await this.deletePatient(patientId);
      },
      reject: () => {
          this.toastr.error("You have rejected!");
      }
  });
  }


  showUpdateDialog(patient: Patient) {
    this.updatePatientDialogService.showDialog(patient);
  }


  showCreateDialog() {
    this.createPatientDialogService.showDialog();
  }


  async onPageChange(event: any): Promise<void> {

    this.userParams.pageNumber = event.page + 1;

    this.userParams.pageSize = event?.rows;

    this.patientService.setUserParams(this.userParams);

    await this.loadPatients();
  }
}
