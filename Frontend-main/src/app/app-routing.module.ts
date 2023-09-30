import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DictionariesComponent } from "./dictionaries/dictionaries.component";
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import { AuthGuard } from "./auth.guard"; // Import the AuthGuard
import {TranslatorComponent} from "./translator/translator.component";

const routes: Routes = [
  // Other routes...
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to the profile route
  },
  { path: 'dictionaries', component: DictionariesComponent },
  { path: 'dictionaries/:dictionary_name', component: DictionariesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'translator', component: TranslatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
