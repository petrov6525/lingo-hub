import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {User} from "./models/user.interface";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    // Send a GET request to your user data API
    return this.http.get<User[]>('http://localhost:8081/users/all').pipe(
      map((users) => {
        // Check if the provided email and password match any user in the response
        const matchedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
          this.isAuthenticated = true;
          this.currentUser = matchedUser;

          // Store user data in local storage
          localStorage.setItem('currentUser', JSON.stringify(matchedUser));

          // Redirect to the /dictionaries route
          this.router.navigate(['/dictionaries']);

          return true; // Login successful
        } else {
          this.isAuthenticated = false;
          this.currentUser = null;
          return false; // Login failed
        }
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        return of(false); // Handle the error and return false for login failure
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;

    // Clear user data from local storage
    localStorage.removeItem('currentUser');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
  getCurrentUser(): User | null {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
}
