import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

const baseUrl = 'http://localhost:8080/api/jobs';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  constructor(private http: HttpClient) { }
  
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(id: any): Observable<Job> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Job[]> {
    return this.http.get<Job[]>(`${baseUrl}?name=${name}`);
  }
}