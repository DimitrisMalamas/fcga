import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard.component';
import { DeckDetailComponent }   from './deck-detail.component';
import { DecksComponent } from './decks.component';
import { DeckService } from './deck.service';

import { CardsComponent } from './cards.component';
import { CardService } from './card.service';
import { PlayComponent } from './play.component';

import { DeckSearchComponent } from './deck-search.component';

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
