import { Component, OnInit } from '@angular/core';
import { loginData } from '../../../Models/Interfaces/LoginData';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../Services/account.service';
import { Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { User } from '../../../Models/Interfaces/User';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { CreatePatientModalComponent } from '../../../Modals/create-patient-modal/create-patient-modal.component';
import { Patient } from '../../../Models/Interfaces/Patient';
import { CreatePatientDialogService } from '../../../Services/create-patient-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { PatientsService } from '../../../Services/patients.service';
import { RegisterComponent } from '../../../Modals/register/register.component';
import { Register } from '../../../Models/Interfaces/Register';

@Component({
  selector: 'app-guest-layout',
  imports:
  [
    FormsModule,
    CommonModule,
    RegisterComponent,
  ],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css'
})
export class GuestLayoutComponent implements OnInit {

  formData: loginData = {
    email : '',
    password: ''
  };

  visible: boolean = false;

  currentUser!: User | null;

  constructor(private accountService: AccountService, private router: Router,
    private createPatientDialogService: CreatePatientDialogService,
    private patientService: PatientsService, private toastr: ToastrService
  ) {}


  ngOnInit(): void {

    this.currentUser = this.accountService.currentUser();

    if (this.currentUser){

      this.redirectTo(this.currentUser.role);
    }
  }

  async login() {

    let response: ApiResponse<User> = await firstValueFrom(this.accountService.login(this.formData));

    if (response.data) {

      this.redirectTo(response.data.role);
    }
  }


  async register(newPatient: Register) {

    var response = await firstValueFrom(this.accountService.register(newPatient));

    this.toastr.success("Created Successfully");

    // this.redirectTo(response.data.role);
  }


  openCreateDialog() {
    this.createPatientDialogService.showDialog();
  }

  redirectTo(role: string) {

    switch(role) {

      case 'Admin': this.router.navigateByUrl('/admin'); break;

      case 'Supplier': this.router.navigateByUrl('/supplier'); break;

      case 'Patient': this.router.navigateByUrl('/patient'); break;

      case 'Delivery': this.router.navigateByUrl('/delivery'); break;

      case 'Doctor' : this.router.navigateByUrl('/doctor'); break;
    }
  }
}
