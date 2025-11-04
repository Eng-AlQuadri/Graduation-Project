import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Services/account.service';
import { Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../Models/Interfaces/User';

@Component({
  selector: 'app-admin-layout',
  imports:
  [
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) {}

  isAsideOpen: boolean = false;
  isPageContentOpen: boolean = true;

  currentUser!: User | null;

  handleIconClick() {

    this.isAsideOpen = !this.isAsideOpen;

    this.isPageContentOpen = !this.isPageContentOpen;

    window.localStorage.setItem("AsideOpen", JSON.stringify(this.isAsideOpen));

    window.localStorage.setItem("PageContentOpened", JSON.stringify(this.isPageContentOpen));
  }


  ngOnInit(): void {

    this.currentUser = this.accountService.currentUser();

    if (this.currentUser?.role !== 'Admin' || !this.currentUser)
      this.router.navigate(['/login'], {replaceUrl: true});

    this.getPageConfig();
  }

  logout(): void {

    this.accountService.logout();

    this.router.navigateByUrl('/login');
  }

  getPageConfig() {

    const asideValue =  window.localStorage.getItem("AsideOpen");

    const pageContentOpened = window.localStorage.getItem("PageContentOpened");

    if (asideValue === 'true')
      this.isAsideOpen = true;

    if (pageContentOpened === 'true')
      this.isPageContentOpen = true;

  }
}
