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
import { RegisterComponent } from './register/register.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DictionariesComponent,
    DictionariesListComponent,
    LoginComponent,
    TranslatorComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
