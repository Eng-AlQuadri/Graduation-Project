import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from '../Models/Interfaces/User';
import { environment } from '../Environments/environment.development';
import { loginData } from '../Models/Interfaces/LoginData';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


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

    localStorage.removeItem('pharmacy.user');

    this.currentUser.set(null);
  }


  setCurrentUser(user: User): void {

    const role = this.getDecodedToken(user.accessToken).role;

    user.role = role;

    localStorage.setItem('pharmacy.user', JSON.stringify(user));

    this.currentUser.set(user);
  }


  getDecodedToken(accessToken: string) {

    return JSON.parse(atob(accessToken.split('.')[1]));

  }

}
