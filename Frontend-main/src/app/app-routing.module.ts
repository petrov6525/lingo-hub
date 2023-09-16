import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {DictionariesComponent} from "./dictionaries/dictionaries.component";
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';

const routes: Routes = [
  // Other routes...
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'dictionaries', component: DictionariesComponent },
  { path: 'dictionaries/:dictionary_name', component: DictionariesListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
