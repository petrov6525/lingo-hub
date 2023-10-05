import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent} from "./profile/profile.component";
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';
import { LoginComponent } from './login/login.component';

//needing for the authorization
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { TranslatorComponent } from './translator/translator.component';
import { RegisterComponent } from './register/register.component';
import { AddToDictionaryModalComponent } from './components/add-to-dictionary-modal/add-to-dictionary-modal.component';
import {NgOptimizedImage} from "@angular/common";
import { AddNewDictionaryModalComponent } from './components/add-new-dictionary-modal/add-new-dictionary-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        DictionariesComponent,
        DictionariesListComponent,
        LoginComponent,
        TranslatorComponent,
        RegisterComponent,
        AddToDictionaryModalComponent,
        AddNewDictionaryModalComponent,
        SuccessModalComponent,
        ErrorModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
