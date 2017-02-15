import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DecksComponent } from './decks/decks.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardsDetailDeleteComponent } from './cards-detail-delete/cards-detail-delete.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'decks', component: DecksComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: DeckDetailComponent },
  { path: 'play/:id', component: PlayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createDeck', component: CreateDeckComponent },
  { path: 'createCard', component: CreateCardComponent },
  { path: 'cardsDetails/:id', component: CardsDetailDeleteComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
