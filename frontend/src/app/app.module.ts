import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckDetailComponent }   from './deck-detail/deck-detail.component';
import { DecksComponent } from './decks/decks.component';
import { DeckService } from './deck.service';

import { CardsComponent } from './cards/cards.component';
import { CardService } from './card.service';
import { PlayComponent } from './play/play.component';

import { DeckSearchComponent } from './deck-search/deck-search.component';

import  { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DeckDetailComponent,
    DecksComponent,
    DashboardComponent,
    DeckSearchComponent,
    CardsComponent,
    PlayComponent
  ],
  providers: [ DeckService, CardService ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
