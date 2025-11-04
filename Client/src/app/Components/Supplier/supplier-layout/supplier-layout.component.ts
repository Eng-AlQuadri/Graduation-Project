import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { AccountService } from '../../../Services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../../Models/Interfaces/User';

@Component({
  selector: 'app-supplier-layout',
  imports:
  [
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './supplier-layout.component.html',
  styleUrl: './supplier-layout.component.css'
})
export class SupplierLayoutComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) {}

  isAsideOpen: boolean = true;
  isPageContentOpen: boolean = false;

  currentUser!: User | null;

  handleIconClick() {
    this.isAsideOpen = !this.isAsideOpen;
    this.isPageContentOpen = !this.isPageContentOpen;
  }


  ngOnInit(): void {

    this.currentUser = this.accountService.currentUser();

    if(!this.currentUser || this.currentUser.role !== 'Supplier')
      this.router.navigate(['/login'], {replaceUrl: true});
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
