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

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Fetch user data from local storage
    this.currentUser = this.authService.getCurrentUser();
  }

  isRootRoute(): boolean {
    return this.router.url === '/';
  }

  redirectToProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const sanitizedUsername = currentUser.name.replace(/ /g, '_');
      this.router.navigate(['/profile', sanitizedUsername]);
    }
  }
}
