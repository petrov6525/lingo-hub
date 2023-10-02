import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {User} from "../models/user.interface";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService implements OnInit{

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  ngOnInit(): void {
  }

  getAllDictionariesByUser():Observable<any> {
    const token = this.authService.getAuthToken();
    const userId = this.authService.getCurrentUser()?.id;
    const headers = new HttpHeaders({
      "auth-token" : token
    })
    return this.http.get<any[]>(`http://localhost:8081/dictionary/all/${userId}`, {headers});
  }
}
