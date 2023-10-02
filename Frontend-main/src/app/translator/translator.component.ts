import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "../auth.service"; // Replace 'path-to-auth.service' with the actual path to your AuthService
import { User } from "../models/user.interface";
import {LanguageCodeServiceService} from "../services/language-code/language-code.service.service";
import {ModalVisibilityService} from "../services/modal-visibility/modal-visibility.service";
import {Subscription} from "rxjs";
import {DictionaryService} from "../services/dictionary/dictionary.service"; // Replace 'User' with your user model type if needed

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent implements OnInit, OnDestroy {
  container1Transform = 'translateY(0%)';
  container2Transform = 'translateY(0%)';

  isRecentFetched: boolean = false;
  languages: any[] = []; // This array will hold the language data
  recentLanguages: any[] = [];
  originCode: string = '';
  translateCode: string = '';
  originText: string = '';
  translatedText: string = ''; // Initialize translatedText as an empty string
  translatedWord: any = null;
  private translatedWordSubscription: Subscription = new Subscription();

  user: User | null = null;
  userId: number | null = null;
  currentEditable: number = 1; // Variable to track the editable textarea

  constructor(private http: HttpClient, private authService: AuthService,
              private languageCodeService: LanguageCodeServiceService,
              private modalVisibilityService: ModalVisibilityService,
              private dictionaryService: DictionaryService) {

  }

  ngOnInit() {
    // Fetch user data from local storage
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.userId = this.user.id; // Assuming your user model has an 'id' property
    }

    // Call the method to fetch language codes when the component initializes
    this.fetchLanguageCodes();
    this.translatedWordSubscription = this.dictionaryService.translatedWordData$.subscribe(
      (data) => {
        this.translatedWord = data;
      }
    )
  }

  fetchLanguageCodes() {
    this.languageCodeService.fetchLanguageCodes().subscribe(
        (response) => {
          if (response) {
            this.languages = response;
          }
        });
  }

  fetchRecentCodes() {
    this.languageCodeService.fetchRecentLanguages().subscribe(
      (response) => {
        if (response) {
          this.recentLanguages = response.map((item: any) => {
            return item.languageCode;
          });
          this.isRecentFetched = true;
        }
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

  selectClickHandler() {
    this.recentLanguagesHandler();
    this.translateHandler();
  }

  recentLanguagesHandler() {
    if (!this.isRecentFetched) {
      this.fetchRecentCodes();
    }

  }

  translateHandler() {
    this.onTextChange(this.currentEditable);
  }

  // Function to check if a textarea is editable
  isEditable(textareaNumber: number): boolean {
    return this.currentEditable === textareaNumber;
  }

  // Function to handle text changes and translation
  onTextChange(textareaNumber: number) {
    this.dictionaryService.setTranslatedWord(null);
    if (this.originText.trim() === '') {
      // Handle empty text as needed
      this.translatedText = ''; // Clear the translation result
      return;
    }

    if (this.translateCode === "" || this.originCode === "") {
      return;
    }

    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      return;
    }

    const headers = new HttpHeaders({
      'auth-token': this.authService.getAuthToken(),
      'uuid': this.user.id // Pass the user ID as a header
    });


    let originText = this.originText;
    let originCode = this.originCode;
    let translateCode = this.translateCode;

    if (this.currentEditable === 2) {
      originText = this.translatedText;
      originCode = this.translateCode;
      translateCode = this.originCode;
    }

    const translationData = {
      origin: originText,
      originCode: originCode,
      translateCode: translateCode,
    };

    this.http
      .post<any>('http://localhost:8081/word/translate', translationData, { headers })
      .subscribe((data) => {
        if (textareaNumber === 1) {
          this.translatedText = data?.translate || ''; // Store the translation result or an empty string if no translation is available
        } else {
          this.originText = data?.translate || ''; // Update the other textarea with the translation result
        }
        this.isRecentFetched = false;
        this.recentLanguagesHandler();
        this.dictionaryService.setTranslatedWord(data);
      });
  }

  clearButtonClickHandler() {
    this.originText = "";
    this.translatedText = "";
  }

  addToDictionaryClickHandler() {
    this.modalVisibilityService.onAddToDictionaryModalVisible();
  }

  ngOnDestroy(): void {
    this.translatedWordSubscription.unsubscribe();
  }
}
