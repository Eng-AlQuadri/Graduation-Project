import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Interfaces/ApiResponse';
import { Card } from '../Models/Interfaces/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = environment.API_URL;


  http: HttpClient = inject(HttpClient);


  constructor() {}


  getCards(): Observable<ApiResponse<Card[]>> {

    return this.http.get<ApiResponse<Card[]>>(this.baseUrl + 'card');
  }


  createCard(newCard: Card): Observable<ApiResponse<Card>> {

    return this.http.post<ApiResponse<Card>>(this.baseUrl + 'card', newCard);
  }


  deleteCard(id: number): Observable<ApiResponse<null>> {

    return this.http.delete<ApiResponse<null>>(this.baseUrl + 'card/' + id);
  }
}
