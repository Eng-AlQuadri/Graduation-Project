import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AccountService } from "../Services/account.service";
import { ToastrService } from "ngx-toastr";

export const adminGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);

  const router = inject(Router);

  const toastr = inject(ToastrService);

  if (accountService.currentUser()?.role === 'Admin') {

    return true;

  } else {

    toastr.error("Unauthorized");

    router.navigate(['/login'], {replaceUrl: true});

    return false;
  }
};
