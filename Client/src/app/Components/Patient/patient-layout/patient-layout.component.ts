import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from '../../../Models/Interfaces/User';
import { AccountService } from '../../../Services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-patient-layout',
  imports: [
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent {

  constructor(private router: Router) {}

  accountService = inject(AccountService);

  isAsideOpen: boolean = false;
  isPageContentOpen: boolean = true;

  currentUser!: User | null;

  handleIconClick() {

    this.isAsideOpen = !this.isAsideOpen;

    this.isPageContentOpen = !this.isPageContentOpen;

    window.sessionStorage.setItem("AsideOpen", JSON.stringify(this.isAsideOpen));

    window.sessionStorage.setItem("PageContentOpened", JSON.stringify(this.isPageContentOpen));
  }


  ngOnInit(): void {

    this.currentUser = this.accountService.currentUser();

    if (this.currentUser?.role !== 'Patient' || !this.currentUser)
      this.router.navigate(['/login'], {replaceUrl: true});

    this.getPageConfig();
  }

  async logout(): Promise<void> {

    await firstValueFrom(this.accountService.logout());

    this.router.navigateByUrl('/login');
  }

  getPageConfig() {

    const asideValue =  window.sessionStorage.getItem("AsideOpen");

    const pageContentOpened = window.sessionStorage.getItem("PageContentOpened");

    if (asideValue === 'true')
      this.isAsideOpen = true;

    if (pageContentOpened === 'true')
      this.isPageContentOpen = true;

  }
}
