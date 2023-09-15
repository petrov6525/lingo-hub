import { Component } from '@angular/core';

@Component({
  selector: 'app-dictionaries-list',
  templateUrl: './dictionaries-list.component.html',
  styleUrls: ['./dictionaries-list.component.css']
})
export class DictionariesListComponent {
  dictionaries: any[] = [ /* Initialize with your dictionary data */ ];
}
