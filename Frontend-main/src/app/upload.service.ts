import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'http://localhost:8081/logo/upload';
  private authToken = 'sirh545dff4e5f4ffkfjhe';

  constructor(private http: HttpClient) {}

  uploadLogo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('logo', file);

    const headers = new HttpHeaders({
      'auth-token': this.authToken,
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
