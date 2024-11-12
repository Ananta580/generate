import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ElementOuter } from '../Models/content';
import { Preset, PRESET_TYPE } from '../Models/preset';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private jsonUrl = 'assets/database/db.json';
  private apiUrl = 'http://localhost:3000/api/content';

  constructor(private http: HttpClient) {}

  getAllForHome(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map((data: any) =>
        data.map((item: Preset) => ({
          contentId: item.contentId,
          imgsrc: `assets/images/content-${item.contentId}.jpg`,
          type: item.type,
          title: item.title,
          subtitle: item.subtitle,
          date: item.date,
          designer: item.designer,
        }))
      )
    );
  }

  getAllContentsByType(type?: PRESET_TYPE): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map((data: any) =>
        data
          .filter((item: Preset) => item.type === type)
          .map((item: Preset) => ({
            contentId: item.contentId,
            imgsrc: `assets/images/content-${item.contentId}.jpg`,
            type: item.type,
            title: item.title,
            subtitle: item.subtitle,
            date: item.date,
            designer: item.designer,
          }))
      )
    );
  }

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
