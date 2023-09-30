import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { User } from "./models/user.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null; // Initialize currentUser to null
  email: string = '';
  password: string = '';
  username: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private http: HttpClient,

  ) {}
  login(): void {
    this.authService.login(this.email, this.password).subscribe((success: boolean) => {
      if (success) {
        // Login successful, navigate to another page or perform other actions
        // You can also store user data in local storage or a session here
      } else {
        // Login failed, display an error message to the user
        console.error("Authentication failed. Please check your email and password.");
      }
    });
  }
  ngOnInit() {
    // Fetch user data from local storage
    this.currentUser = this.authService.getCurrentUser();
  }
  register() {
    // Create the user object to send to the server
    const user = {
      name: this.username,
      email: this.email,
      password: this.password,
    };

    // Define headers with the authentication token
    const headers = new HttpHeaders({
      'auth-token': 'sirh545dff4e5f4ffkfjhe',
    });

    // Send a POST request to add the user to the database
    this.http
      .post('http://localhost:8081/users/add', user, { headers })
      .subscribe(
        (response) => {
          // Registration successful, you can redirect or display a success message
          console.log('Registration successful:', response);
          // Redirect to login page
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle registration error, display an error message or log the error
          console.error('Registration error:', error);
        }
      );
  }
  isRootRoute(): boolean {
    return this.router.url === '/';
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
  redirectToProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const sanitizedUsername = currentUser.name.replace(/ /g, '_');
      this.router.navigate(['/profile', sanitizedUsername]);
    }
  }
}
