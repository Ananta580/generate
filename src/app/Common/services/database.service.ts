import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElementOuter } from '../Models/content';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private jsonUrl = 'assets/database/db.json';
  private apiUrl = 'http://localhost:3000/api/content';

  constructor(private http: HttpClient) {}

  getAllContents(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  addContent(content: ElementOuter): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, content);
  }

  updateContent(content: ElementOuter, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(content));

    if (file) {
      formData.append('file', file);
    }
    return this.http.put<any>(`${this.apiUrl}/${content.contentId}`, formData);
  }
}
