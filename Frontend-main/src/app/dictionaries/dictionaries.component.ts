import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.css']
})
export class DictionariesComponent implements OnInit {
  currentUser: any;
  dictionaries: any[] = []; // Declare and initialize the 'dictionaries' array

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    const userId = this.currentUser.id;
    const authToken = 'sirh545dff4e5f4ffkfjhe';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken
    });

    this.http.get(`http://localhost:8081/dictionary/all/${userId}`, { headers }).subscribe(
      (data: any) => {
        // Handle the data received from the API
        this.dictionaries = data; // Assign the fetched data to the 'dictionaries' array
      },
      (error) => {
        // Handle any errors
        console.error('Error fetching data:', error);
      }
    );
  }

  redirectToDictionary(dictionaryName: string) {
    // Replace spaces with underscores in the dictionaryName
    const formattedDictionaryName = dictionaryName.replace(/\s+/g, '_');

    // Navigate to the formatted dictionary name
    this.router.navigate(['/dictionaries', formattedDictionaryName]);
  }
}
