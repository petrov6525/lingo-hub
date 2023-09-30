import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "../auth.service"; // Replace 'path-to-auth.service' with the actual path to your AuthService
import { User } from "../models/user.interface"; // Replace 'User' with your user model type if needed

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent implements OnInit {
  container1Transform = 'translateY(0%)';
  container2Transform = 'translateY(0%)';

  languages: any[] = []; // This array will hold the language data
  selectedLanguage1: string = '';
  selectedLanguage2: string = '';
  englishText: string = '';
  ukraineText: string = '';
  translationResult: string = ''; // Initialize translationResult as an empty string

  user: User | null = null;
  userId: number | null = null;
  currentEditable: number = 1; // Variable to track the editable textarea

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    // Fetch user data from local storage
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.userId = this.user.id; // Assuming your user model has an 'id' property
    }

    // Call the method to fetch language codes when the component initializes
    this.fetchLanguageCodes();
  }

  fetchLanguageCodes() {
    // Define the headers with the authentication token
    const headers = new HttpHeaders({
      'auth-token': 'sirh545dff4e5f4ffkfjhe',
    });

    // Send the GET request to the API to fetch language codes
    this.http
      .get<any[]>('http://localhost:8081/lang-code/all', { headers })
      .subscribe((data) => {
        // Sort the languages by count in descending order
        this.languages = data.sort((a, b) => b.count - a.count);
      });
  }

  // Function to toggle the editable textarea
  toggleContainers() {
    if (this.container1Transform === 'translateY(0%)') {
      this.container1Transform = 'translateY(100%)';
      this.container2Transform = 'translateY(-100%)';
      this.currentEditable = 2; // Toggle to the second textarea
    } else {
      this.container1Transform = 'translateY(0%)';
      this.container2Transform = 'translateY(0%)';
      this.currentEditable = 1; // Toggle back to the first textarea
    }
  }

  // Function to check if a textarea is editable
  isEditable(textareaNumber: number): boolean {
    return this.currentEditable === textareaNumber;
  }

  // Function to handle text changes and translation
  onTextChange(text: string, originCode: string, translateCode: string, textareaNumber: number) {
    if (text.trim() === '') {
      // Handle empty text as needed
      this.translationResult = ''; // Clear the translation result
      return;
    }

    const headers = new HttpHeaders({
      'auth-token': 'sirh545dff4e5f4ffkfjhe',
      'uuid': this.userId?.toString() || '', // Pass the user ID as a header
    });

    const translationData = {
      origin: text,
      originCode: originCode,
      translateCode: translateCode,
    };

    this.http
      .post<any>('http://localhost:8081/word/translate', translationData, { headers })
      .subscribe((data) => {
        if (textareaNumber === 1) {
          this.translationResult = data?.translate || ''; // Store the translation result or an empty string if no translation is available
        } else {
          this.englishText = data?.translate || ''; // Update the other textarea with the translation result
        }
      });
  }
}
