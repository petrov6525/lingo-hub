import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private http: HttpClient) {}

    login(): void {
        // Send a GET request to your user data API
        this.http.get<any[]>('http://localhost:8081/users/all').subscribe(
            (users) => {
                // Check if the provided email and password match any user in the response
                const matchedUser = users.find(
                    (user) => user.email === this.email && user.password === this.password
                );

                if (matchedUser) {
                    // Authentication succeeded, display user credentials
                    console.log(matchedUser);
                    // You can redirect the user to another page or perform other actions as needed.
                    // For example, you can store user information in local storage.
                } else {
                    // Authentication failed, display an error message
                    console.error("Authentication failed. Please check your email and password.");
                }
            },
            (error) => {
                console.error('An error occurred:', error);
            }
        );
    }
}
