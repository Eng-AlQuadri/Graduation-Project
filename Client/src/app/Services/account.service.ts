import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from '../Models/Interfaces/User';
import { environment } from '../Environments/environment.development';
import { loginData } from '../Models/Interfaces/LoginData';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  http: HttpClient = inject(HttpClient);

  toastr: ToastrService = inject(ToastrService);


  currentUser = signal<User | null>(null);

  baseUrl: string = environment.API_URL;


  register() {

  }


  login(data: loginData): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>(this.baseUrl + "account/login", data).pipe(

      map((response: ApiResponse<User>) => {

        const user = response.data;

        if (user) {

          this.setCurrentUser(user);

        }

        return response;

      })
    )
  }


  logout() {

    return this.http.post<ApiResponse<null>>(this.baseUrl + "account/logout", { refreshToken: this.currentUser()?.refreshToken })
      .pipe(
        tap(() => {

          localStorage.removeItem('pharmacy.user');

          this.currentUser.set(null);

          this.toastr.success("Logged out successfully");
        })
      )
  }


  refreshToken() {

    return this.http.post<ApiResponse<User>>(this.baseUrl + "account/refresh", {refreshToken: this.currentUser()?.refreshToken})
      .pipe(
        tap((user) => {

          this.setCurrentUser(user.data);
        })
      )
  }


  setCurrentUser(user: User): void {

    const role = this.getDecodedToken(user.accessToken).role;

    const userId = this.getDecodedToken(user.accessToken).nameid;

    user.role = role;

    user.userId = userId;

    localStorage.removeItem('pharmacy.user');

    localStorage.setItem('pharmacy.user', JSON.stringify(user));

    this.currentUser.set(user);
  }


  getDecodedToken(accessToken: string) {

    return JSON.parse(atob(accessToken.split('.')[1]));

  }

}
