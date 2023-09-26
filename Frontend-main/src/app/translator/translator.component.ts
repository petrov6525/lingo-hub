import { Component } from '@angular/core';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent {
  container1Transform = 'translateY(0%)';
  container2Transform = 'translateY(0%)';
  englishText = '';
  ukraineText = '';


  toggleContainers() {
    if (this.container1Transform === 'translateY(0%)') {
      this.container1Transform = 'translateY(100%)';
      this.container2Transform = 'translateY(-100%)';
    } else {
      this.container1Transform = 'translateY(0%)';
      this.container2Transform = 'translateY(0%)';
    }
  }
  translateText(source: 'english' | 'ukraine') {
    // Perform translation logic here based on the source
    // For example, you can use a translation library or API
    // Update the other text area with the translated text
    if (source === 'english') {
      // Translate and update ukraineText
      // Example: this.ukraineText = performTranslation(this.englishText);
    } else if (source === 'ukraine') {
      // Translate and update englishText
      // Example: this.englishText = performTranslation(this.ukraineText);
    }
  }
}
