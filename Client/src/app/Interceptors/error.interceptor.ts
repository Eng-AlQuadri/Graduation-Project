import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";
import { ApiResponse } from "../Models/Interfaces/ApiResponse";

// Task: make this interceptor support another status code message (ex: 200, 300)

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);

  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {

      const apiResponse = error.error as ApiResponse<void>;

      // Check if it's an ApiResponse shape
      const isApiResponse =
        apiResponse &&
        typeof apiResponse === 'object' &&
        'success' in apiResponse &&
        'statusCode' in apiResponse &&
        'message' in apiResponse &&
        'data' in apiResponse;

      if (isApiResponse) {

        const { statusCode, message, data } = apiResponse;

        switch (statusCode) {

          case 400:


            if (Array.isArray(data) && data.length > 0) {

              data.forEach(item => {

                toastr.error(item.description);

              })

            } else {

              toastr.error(message || 'Bad request');
            }

            break;

          case 401:
            toastr.error(message || 'Unauthorized');
            break;

          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            const navigationExtras: NavigationExtras = { state: { error: apiResponse } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            toastr.error(message || 'Unexpected error occurred');
            break;
        }

      } else {

        switch(error.status) {

          case 400:

            if (error.error.errors) {

              const modalStateErrors = [];

              for (const key in error.error.errors) {

                if (error.error.errors[key]) {

                  modalStateErrors.push(...error.error.errors[key]);
                }
              }

              for (const error of modalStateErrors) {

                toastr.error(error);
              }

              throw modalStateErrors.flat();

            } else if (typeof(error.error) === 'object') {

              toastr.error(error.statusText, error.status);

            } else {

              toastr.error(error.error, error.status);
            }

            break;

          case 401:

            toastr.error("Unauthorized", error.status);

            break;

          case 404:

            router.navigateByUrl('/not-found');

            break;

          case 500:

            const navigationExtras: NavigationExtras = {state: {error: error.error}};

            router.navigateByUrl('/server-error', navigationExtras);

            break;

          default:

            toastr.error("Something unexpected went wrong");

            break;

        }
      }

      return throwError(() => error);
    })
  )
};
