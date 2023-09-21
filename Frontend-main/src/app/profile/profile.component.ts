import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string = '';
  user: any; // Define a user object to hold user data
  uploadLabel = 'Upload your img'; // Initial label text
  uploadedImageName = ''; // To display the uploaded image name
  currentUser: any; // Define currentUser here

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.loadUserProfile();
    });
  }

  loadUserProfile(): void {
    // Fetch user data from the AuthService or local storage
    this.user = this.authService.getCurrentUser();
    this.currentUser = this.user; // Assign user data to currentUser

    // You can access user data fields like this:
    // this.currentUser.name, this.currentUser.email, etc.
  }

  // Define the handleImageUpload function to handle file selection
  handleImageUpload(event: any) {
    const files = event.target.files;
    this.handleFiles(files);
  }

  private handleFiles(files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }

    // Handle the selected files here
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedImageName = file.name; // Update the displayed image name
      this.uploadLabel = 'Image Uploaded'; // Update the label text
      console.log('Selected File:', file.name);
      // You can perform further operations, like uploading the file to a server.
    }
  }

  formatImageName(name: string) {
    if (name.length > 5) {
      return name.substring(0, 5) + '...' + name.substring(name.length - 4);
    }
    return name;
  }
  logout(): void {
    // Call the logout method from your authentication service
    this.authService.logout();

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
  // Add a function to save changes to the user's profile
  saveChanges() {
    // Implement logic to save changes to the user's profile
    // You can use this.currentUser to access the user's data
    // Update user's name, email, password, etc., as needed
  }
}
