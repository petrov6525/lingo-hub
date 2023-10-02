import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService implements OnInit{

  private translatedWord = new BehaviorSubject<any>(null);
  translatedWordData$ = this.translatedWord.asObservable();
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

  public setTranslatedWord(data: any) {
    this.translatedWord.next(data);
  }

  public getTranslatedWord() {
    return this.translatedWord.value;
  }

  public addWordToDictionary(dictionaries: any[]): any {
      const translatedWord: any = this.getTranslatedWord();
      const token = this.authService.getAuthToken();
      const headers = new HttpHeaders({
        "auth-token": token
      })
      dictionaries.forEach((id: any)=> {
        translatedWord.dictionary = {
          id: id
        };
        this.http.post("http://localhost:8081/word/add", translatedWord, {headers}).subscribe();
      })
  }
}
