import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Services/account.service';

export const doctorGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);

  const router = inject(Router);

  const toastr = inject(ToastrService);

  if (accountService.currentUser()?.role === 'Doctor') {

    return true;

  } else {

    toastr.error("Unauthorized");

    router.navigate(['/login'], {replaceUrl: true});

    return false;
  }
};
