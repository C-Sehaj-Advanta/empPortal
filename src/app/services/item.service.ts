import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://hub.dummyapis.com/employee?noofRecords=50&idStarts=1001';
  constructor(private http: HttpClient) {}
  getItems(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);

  }
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

}
