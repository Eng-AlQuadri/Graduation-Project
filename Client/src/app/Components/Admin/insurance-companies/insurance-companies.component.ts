import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../../Models/Interfaces/ApiResponse';
import { Pagination } from '../../../Models/Interfaces/Pagination';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { InsuranceCompany } from '../../../Models/Interfaces/InsuranceCompany';
import { CompanyParams } from '../../../Models/Interfaces/CompanyParams';
import { CompanyService } from '../../../Services/company.service';
import { UpdateCompanyDialogService } from '../../../Services/update-company-dialog.service';
import { CreateCompanyDialogService } from '../../../Services/create-company-dialog.service';
import { UpdateCompanyModalComponent } from '../../../Modals/update-company-modal/update-company-modal.component';
import { CreateCompanyModalComponent } from '../../../Modals/create-company-modal/create-company-modal.component';

@Component({
  selector: 'app-insurance-companies',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    PaginatorModule,
    UpdateCompanyModalComponent,
    CreateCompanyModalComponent,
],
  templateUrl: './insurance-companies.component.html',
  styleUrl: './insurance-companies.component.css',
  providers: [ConfirmationService]
})
export class InsuranceCompaniesComponent implements OnInit {

  companies: InsuranceCompany[] = [];
  pagination!: Pagination<InsuranceCompany>;
  companyParams: CompanyParams = new CompanyParams();

  constructor(private companyService: CompanyService, private toastr: ToastrService,
    private updateCompanyDialog: UpdateCompanyDialogService,
    private createCompanyDialog: CreateCompanyDialogService,
    private confirmationService: ConfirmationService,
  ) {}


  async ngOnInit() {

    await this.loadCompanies();
  }


  async loadCompanies() {

    let response = await firstValueFrom(this.companyService.getCompanies(this.companyParams));

    this.companies = response.data ?? [];
  }


  async createCompany(newCompany: InsuranceCompany) {

    let response: ApiResponse<InsuranceCompany> = await firstValueFrom(this.companyService.createCompany(newCompany));

    this.toastr.success("Created Successfully");

    this.companies.unshift(response.data);

  }


  async updateCompany(updatedCompany: InsuranceCompany) {

    // let updatedMedicineDto: UpdateMedicine = {
    //   updateMedicineId: updatedMedicine.id,
    //   name: updatedMedicine.name,
    //   stock: updatedMedicine.stock,
    //   packing: updatedMedicine.packing,
    //   expiryDate: updatedMedicine.expiryDate,
    //   price: updatedMedicine.price
    // };

    await firstValueFrom(this.companyService.updateCompany(updatedCompany));

    this.toastr.success("Updated Successfully");

  }


  showUpdateDialog(company: InsuranceCompany) {
    this.updateCompanyDialog.showDialog(company);
  }


  showCreateDialog() {
    this.createCompanyDialog.showDialog();
  }


  async deleteCompany(id: number): Promise<void> {

    await firstValueFrom(this.companyService.deleteCompany(id));

    this.companies = this.companies.filter(x => x.id != id);

    this.toastr.success("Deleted successfully");
  }

  confirmRemove(event: Event, companyId: number) {
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
          label: 'Remove',
          severity: 'danger'
      },
      accept: async () => {
        await this.deleteCompany(companyId);
      },
      reject: () => {
        this.toastr.error("You have rejected!");
      }
  });
  }


  async onPageChange(event: any) {

    this.companyParams.pageNumber = event.page + 1;

    this.companyParams.pageSize = event?.rows;

    await this.loadCompanies();
  }
}

