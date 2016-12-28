import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DecksComponent } from './decks.component';
import { DeckDetailComponent } from './deck-detail.component';
import { PlayComponent } from './play.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'decks', component: DecksComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: DeckDetailComponent },
  { path: 'play/:id', component: PlayComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
