import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Card } from '../../../Models/Interfaces/Card';
import { InsuranceCompany } from '../../../Models/Interfaces/InsuranceCompany';
import { CompanyService } from '../../../Services/company.service';
import { CompanyParams } from '../../../Models/Interfaces/CompanyParams';
import { CardService } from '../../../Services/card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insurance',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PaginatorModule,
    Dialog,
    DatePipe,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.css'
})
export class InsuranceComponent implements OnInit {

  cards: Card[] = [];

  companies: InsuranceCompany[] = []

  companyService: CompanyService = inject(CompanyService);

  cardService: CardService = inject(CardService);

  router: Router = inject(Router);

  fb: FormBuilder = inject(FormBuilder);

  toastr: ToastrService = inject(ToastrService);

  visible: boolean = false;

  createForm!: FormGroup;


  async ngOnInit() {

    this.buildCreateForm();

    await this.loadCompanies();

    await this.loadCards();
  }


  async loadCompanies() {

    let response = await firstValueFrom(this.companyService.getCompanies(new CompanyParams));

    this.companies = response.data;
  }


  buildCreateForm() {
    this.createForm = this.fb.group({
      cardNo: ['', Validators.required],
      companyId: ['', Validators.required],
      expiry: ['', Validators.required]
    });
  }


  closeDialog() {

    this.visible = !this.visible;

    this.createForm.reset();
  }


  showCreateDialog() {

    this.visible = !this.visible;
  }


  async createCard() {

    let formValue = this.createForm.value as Card;

    this.closeDialog();

    let response = await firstValueFrom(this.cardService.createCard(formValue));

    this.cards.unshift(response.data);

    this.toastr.success("Created Successfully");
  }


  async DeleteCard(id: number) {

    await firstValueFrom(this.cardService.deleteCard(id));

    this.cards = this.cards.filter(x => x.id != id);

    this.toastr.success("Deleted Successfully");
  }


  async loadCards() {

    let response = await firstValueFrom(this.cardService.getCards());

    this.cards = response.data;
  }

}
