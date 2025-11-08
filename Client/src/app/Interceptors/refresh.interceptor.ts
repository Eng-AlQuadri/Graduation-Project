import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { User } from '../Models/Interfaces/User';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountService);

  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        // Attempt token refresh
        return from(accountService.refreshToken()).pipe(

          switchMap((newUser: ApiResponse<User>) => {

            // Clone original request with new token
            const clonedReq = req.clone({

              setHeaders: { Authorization: `Bearer ${newUser.data.accessToken}` }

            });

            accountService.setCurrentUser(newUser.data);

            // Retry the request
            return next(clonedReq);

          }),
          catchError(err => {

            // Refresh failed, logout or notify user
            toastr.error('Session expired. Please login again.');

            accountService.logout();

            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  )
};
