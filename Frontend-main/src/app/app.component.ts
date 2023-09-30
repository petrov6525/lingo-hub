import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { User } from "./models/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null; // Initialize currentUser to null
  email: string = '';
  password: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef

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
