import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  isRootRoute(): boolean {
    return this.router.url === '/';
  }
  redirectToProfile(username: string) {
    this.router.navigate(['/profile', username]);
  }
}
