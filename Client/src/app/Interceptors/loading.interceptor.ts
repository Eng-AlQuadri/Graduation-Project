import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, Observable, switchMap, timer } from "rxjs";
import { BusyService } from "../Services/busy.service";

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {

  const busyService = inject(BusyService);

  busyService.busy();

  return timer(1000).pipe(
    switchMap(() => next(req).pipe(finalize(() => busyService.idle())))
  );
};
