import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCreate, ResponseCreate, ResponseRegistration, ResponseRegistrations } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  private url = 'http://localhost:3000/registrations'

  constructor(private http: HttpClient) { }

  getRegistrations(): Observable<ResponseRegistrations> {
    return this.http.get<ResponseRegistrations>(`${this.url}`);
  }

  createRegistration(request: RequestCreate): Observable<ResponseCreate> {
    return this.http.post<ResponseCreate>(this.url, request);
  }

  getRegistration(id: string): Observable<ResponseRegistration> {
    return this.http.get<ResponseRegistration>(`${this.url}/${id}`);
  }

  deleteRegistration(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
