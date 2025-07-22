import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/data';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/data';
  constructor(private http: HttpClient) {}
  getItems(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);

  }
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  

}
