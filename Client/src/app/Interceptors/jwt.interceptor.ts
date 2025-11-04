import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { User } from "../Models/Interfaces/User";
import { AccountService } from "../Services/account.service";


export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountService);

  let currentUser: User | null = accountService.currentUser();

  if (currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.accessToken}`
      }
    })
  }

  return next(req);
};
