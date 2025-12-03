import { Component, OnInit } from '@angular/core';
import { AccountService } from './Services/account.service';
import { User } from './Models/Interfaces/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports:
  [
    RouterOutlet,
    FormsModule,
    CommonModule,
    NgxSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {


  constructor(public accountService: AccountService, public router: Router) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const jsonUser = sessionStorage.getItem('pharmacy.user');
    if(jsonUser) {
      const user: User = JSON.parse(jsonUser);
      this.accountService.setCurrentUser(user);
      this.router.navigateByUrl(`/${user.role.toLowerCase()}`);
    }
  }

}
