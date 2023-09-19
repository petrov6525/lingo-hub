import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isAuthenticatedUser()) { // Use isAuthenticatedUser instead of isAuthenticated
            return true; // User is authenticated, allow access
        } else {
            this.router.navigate(['/login']); // Redirect to login page if not authenticated
            return false;
        }
    }
}
