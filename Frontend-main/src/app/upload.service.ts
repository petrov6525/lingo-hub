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

  // Add a method to update user's logo in the backend
  updateUserLogo(userId: number, logoId: number): Observable<any> {
    // Create a FormData object
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('logoId', logoId.toString());

    // Set the auth-token header
    const headers = new HttpHeaders({
      'auth-token': this.authToken,
    });

    // Make the HTTP POST request with FormData
    return this.http.post('http://localhost:8081/users/update-logo', formData, { headers });
  }
}
