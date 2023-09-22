import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string = '';
  user: any;
  uploadLabel = 'Upload your img';
  uploadedImageName: string = '';

  constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router,
      private uploadService: UploadService
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

    // You can access user data fields like this:
    // this.user.name, this.user.email, etc.
  }

  handleImageUpload(event: any) {
    const fileInput = event.target;

    // Check if a file is selected
    if (fileInput.files && fileInput.files.length > 0) {
      // Get the selected file name
      const fileName = fileInput.files[0].name;

      // Extract the file extension
      const fileExtension = fileName.split('.').pop() || '';

      // Truncate the file name to the first 5 characters
      const truncatedFileName = fileName.slice(0, 5);

      // Update the uploadedImageName property to display the truncated file name
      this.uploadedImageName = `${truncatedFileName}..${fileExtension}`;
    } else {
      // No file selected, reset the uploadedImageName
      this.uploadedImageName = '';
    }
  }

  formatImageName(name: string) {
    const maxLength = 5; // Maximum characters to display before ellipsis
    const fileTypeIndex = name.lastIndexOf('.');

    // Check if the file name length is less than or equal to maxLength
    if (name.length <= maxLength + 4) {
      return name; // No need for ellipsis
    }

    const prefix = name.substring(0, maxLength); // Get the first maxLength characters
    const fileType = name.substring(fileTypeIndex); // Get the file type (e.g., .jpg)

    return `${prefix}...${fileType}`;
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

  logout(): void {
    // Call the logout method from your authentication service
    this.authService.logout();

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }

  // Add a function to save changes to the user's profile
  saveChanges(): void {
    // Implement logic to save changes to the user's profile
    // You can use this.user to access the user's data
    // Update user's name, email, password, etc., as needed

    // Handle image upload
    const fileInput = document.getElementById('upload_img') as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      this.uploadService.uploadLogo(file).subscribe(
        (response) => {
          // Handle successful upload
          console.log('Logo uploaded successfully:', response);

          // Continue with saving changes if needed
        },
        (error) => {
          // Handle upload error
          console.error('Error uploading logo:', error);

          // Continue with saving changes if needed
        }
      );
    } else {
      // Continue with saving changes without uploading a file
    }
  }
}
