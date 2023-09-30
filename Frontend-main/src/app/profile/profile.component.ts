import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { User } from "../models/user.interface";

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

    logout(): void {
        // Call the logout method from your authentication service
        this.authService.logout();

        // Redirect the user to the login page
        this.router.navigate(['/login']);
    }

    // Add a function to save changes to the user's profile
    saveChanges(): void {
        // Create an object with updated user data
        const updatedUserData: User = {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            token: this.user.token,
            logo_id: this.user.logo_id,
        };

        // Send a request to update the user's data in the backend
        this.authService.updateUser(updatedUserData).subscribe(
            (updateResponse) => {
                // Handle successful user data update
                console.log('User data updated successfully:', updateResponse);

                // Handle image upload if a file is selected
                const fileInput = document.getElementById('upload_img') as HTMLInputElement;

                if (fileInput && fileInput.files && fileInput.files.length > 0) {
                    const file = fileInput.files[0];

                    this.uploadService.uploadLogo(file).subscribe(
                        (response) => {
                            // Handle successful upload
                            console.log('Logo uploaded successfully:', response);

                            // Send a request to update the user's logo ID in the backend
                            console.log(response.id);
                            this.uploadService.updateUserLogo(updatedUserData.id, response.id).subscribe(
                                (updateLogoResponse) => {
                                    // Handle successful user logo update
                                    console.log('User logo updated successfully:', updateLogoResponse);

                                    // Update the user object with the new logo ID
                                    this.user.logo_id = response.id;
                                },
                                (updateLogoError) => {
                                    // Handle user logo update error
                                    console.error('Error updating user logo:', updateLogoError);
                                }
                            );
                        },
                        (error) => {
                            // Handle upload error
                            console.error('Error uploading logo:', error);
                        }
                    );
                } else {
                    // No file selected for upload, simply update the user information
                    console.warn('No file selected for upload');
                }

                // Store the updated user data in LocalStorage and refresh
                this.user = { ...this.user, ...updateResponse }; // Update the user object with new data
                localStorage.setItem('currentUser', JSON.stringify(this.user));

            },
            (updateError) => {
                // Handle user data update error
                console.error('Error updating user data:', updateError);
            }
        );
    }
}
