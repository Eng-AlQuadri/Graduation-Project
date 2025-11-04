import { inject, Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { AccountService } from "../Services/account.service";
import { ToastrService } from "ngx-toastr";

export const supplierGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);

  const router = inject(Router);

  const toastr = inject(ToastrService);

  if (accountService.currentUser()?.role === 'Supplier') {

    return true;

  } else {

    toastr.error("Unauthorized");

    router.navigate(['/login'], {replaceUrl: true});

    return false;
  }
};
