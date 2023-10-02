import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user.interface";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    console.log("login");
    if (this.authService.getCurrentUser() !== null) {
      this.router.navigate(['/translator']);
    }
  }


  login(): void {
    /*this.authService.login(this.email, this.password).subscribe((success: boolean) => {
      if (success) {
        // Login successful, navigate to another page or perform other actions
        // You can also store user data in local storage or a session here
      } else {
        // Login failed, display an error message to the user
        console.error("Authentication failed. Please check your email and password.");
      }
    });*/
  }
}
