import { Injectable } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanguageCodeServiceService {

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  fetchLanguageCodes(): Observable<any[]> {
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'auth-token': token
    });
    return this.http.get<any[]>('http://localhost:8081/lang-code/all', { headers });
  }

  fetchRecentLanguages(): Observable<any> {
    const token = this.authService.getAuthToken();
    const userId = this.authService.getCurrentUser()?.id;
    const headers = new HttpHeaders({
      'auth-token': token
    });
    return this.http.get<any[]>(`http://localhost:8081/statistic/get/${userId}`, { headers });
  }
}
