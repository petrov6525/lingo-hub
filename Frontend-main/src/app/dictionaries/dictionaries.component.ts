import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.css']
})
export class DictionariesComponent {

  constructor(private router: Router) {}

  redirectToDictionary(dictionaryName: string) {
    this.router.navigate(['/dictionaries', dictionaryName]);
  }
}