import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  uploadLabel = 'Upload your img'; // Initial label text
  uploadedImageName = ''; // To display the uploaded image name

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
}
