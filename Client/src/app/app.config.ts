import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './Interceptors/jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
  [
    provideHttpClient(withInterceptors([
      errorInterceptor,
      JwtInterceptor,
      LoadingInterceptor
    ])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxSpinnerModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: "toast-bottom-right",
        preventDuplicates: false
      })
    )
  ]
};
