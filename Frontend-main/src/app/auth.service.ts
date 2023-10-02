import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {User} from './models/user.interface';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticated = false;
    currentUser: User | null = null;

    constructor(private http: HttpClient, private router: Router) {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.isAuthenticated = true;
            this.currentUser = JSON.parse(storedUser);
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>('http://localhost:8081/auth/login',
            {
                email: email,
                password: password
            })
            .pipe(
                tap((response) => {
                    if (!response) {
                        console.log("User not found");
                    } else {
                        this.currentUser = response;
                        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    }
                }),
                catchError((error) => {
                    console.error("Произошла ошибка при выполнении запроса:", error);
                    return throwError(error);
                })
            );
    }

    logout(): void {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    isAuthenticatedUser(): boolean {
        return this.isAuthenticated;
    }

    getCurrentUser(): User | null {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    }

    updateUser(user: User): Observable<any> {
        const headers = new HttpHeaders({
            'auth-token': 'sirh545dff4e5f4ffkfjhe', // Replace with your actual token
        });

        return this.http.put(`http://localhost:8081/users/update`, user, {headers}).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('An error occurred:', error);
                return of(null);
            })
        );
    }

    getAuthToken(): string | any {
        if (this.currentUser) {
            return this.currentUser.token;
        } else {
            this.router.navigate(['/login']).then(r => {
            })
        }
    }
}
