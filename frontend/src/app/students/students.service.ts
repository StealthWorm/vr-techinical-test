import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCreate, RequestUpdate, ResponseCreate, ResponseStudent, ResponseStudents, ResponseUpdate } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url = 'http://localhost:3000/students'

  constructor(private http: HttpClient) { }

  getStudents(): Observable<ResponseStudents> {
    return this.http.get<ResponseStudents>(`${this.url}?query&page=1`);
  }

  createStudent(request: RequestCreate): Observable<ResponseCreate> {
    return this.http.post<ResponseCreate>(this.url, request);
  }

  getStudent(id: string): Observable<ResponseStudent> {
    return this.http.get<ResponseStudent>(`${this.url}/${id}`);
  }

  updateStudent(id: string, request: RequestUpdate): Observable<ResponseUpdate> {
    return this.http.put<ResponseUpdate>(`${this.url}/${id}`, request);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
