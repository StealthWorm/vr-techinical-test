import { Injectable } from '@angular/core';
import { RequestCreate, RequestUpdate, ResponseCourse, ResponseCourses, ResponseCreate, ResponseUpdate } from './course.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private url = 'http://localhost:3000/courses'

  constructor(private http: HttpClient) { }

  getCourses(): Observable<ResponseCourses> {
    return this.http.get<ResponseCourses>(`${this.url}?query&page=1`);
  }

  createCourse(request: RequestCreate): Observable<ResponseCreate> {
    return this.http.post<ResponseCreate>(this.url, request);
  }

  getCourse(id: string): Observable<ResponseCourse> {
    return this.http.get<ResponseCourse>(`${this.url}/${id}`);
  }

  updateCourse(id: string, request: RequestUpdate): Observable<ResponseUpdate> {
    return this.http.put<ResponseUpdate>(`${this.url}/${id}`, request);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
