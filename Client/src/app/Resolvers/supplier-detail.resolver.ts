import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Purchase } from "../Models/Interfaces/Purchase";
import { Observable } from "rxjs";
import { SuppliersService } from "../Services/suppliers.service";
import { ApiResponse } from "../Models/Interfaces/ApiResponse";
import { Pagination } from "../Models/Interfaces/Pagination";
import { PurchaseParams } from "../Models/Interfaces/PurchaseParams";

@Injectable({
  providedIn: 'root'
})

export class SupplierDetailResolver implements Resolve<ApiResponse<Pagination<Purchase>>> {

  constructor(private supplierService: SuppliersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ApiResponse<Pagination<Purchase>>> {
    return this.supplierService.getSupplierPurchases(parseInt(route.paramMap.get('id')!), new PurchaseParams());
  }
}
