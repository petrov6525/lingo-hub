import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { User } from "./models/user.interface"; // Make sure to import the User interface if you haven't already

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null; // Initialize currentUser to null

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Fetch user data from local storage
    this.currentUser = this.authService.getCurrentUser();
  }

  isRootRoute(): boolean {
    return this.router.url === '/';
  }

  redirectToProfile(username: string) {
    const sanitizedUsername = username.replace(/ /g, '_');
    this.router.navigate(['/profile', sanitizedUsername]);
  }
}
