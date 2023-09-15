import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProfileComponent} from "./profile/profile.component";
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DictionariesComponent,
    DictionariesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
