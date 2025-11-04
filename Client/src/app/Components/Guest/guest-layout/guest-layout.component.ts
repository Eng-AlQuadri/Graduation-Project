import { Component, OnInit } from '@angular/core';
import { loginData } from '../../../Models/Interfaces/LoginData';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../Services/account.service';
import { Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { User } from '../../../Models/Interfaces/User';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';

@Component({
  selector: 'app-guest-layout',
  imports:
  [
    FormsModule,
    CommonModule
  ],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css'
})
export class GuestLayoutComponent implements OnInit {

  formData: loginData = {
    email : '',
    password: ''
  };

  currentUser!: User | null;

  constructor(private accountService: AccountService, private router: Router) {}


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

  redirectTo(role: string) {

    switch(role) {

      case 'Admin': this.router.navigateByUrl('/admin'); break;

      case 'Supplier': this.router.navigateByUrl('/supplier'); break;

      case 'Patient': this.router.navigateByUrl('/patient'); break;
    }
  }
}
