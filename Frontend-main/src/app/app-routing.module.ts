import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DictionariesComponent } from "./dictionaries/dictionaries.component";
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard"; // Import the AuthGuard from the correct path

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
