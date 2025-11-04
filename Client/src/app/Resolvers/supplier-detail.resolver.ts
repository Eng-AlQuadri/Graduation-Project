import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Purchase } from "../Models/Interfaces/Purchase";
import { Observable } from "rxjs";
import { SuppliersService } from "../Services/suppliers.service";

@Injectable({
  providedIn: 'root'
})

export class SupplierDetailResolver implements Resolve<Purchase> {

  constructor(private supplierService: SuppliersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Purchase> {
    return this.supplierService.getSupplierPurchases(parseInt(route.paramMap.get('id')!));
  }
}
