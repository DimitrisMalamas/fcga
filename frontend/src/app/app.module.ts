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
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { TabsModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { TypeaheadModule } from 'ng2-bootstrap';
import { RegisterComponent } from './register/register.component';
import { CardsDetailDeleteComponent } from './cards-detail-delete/cards-detail-delete.component';
@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DeckDetailComponent,
    DecksComponent,
    DashboardComponent,
    DeckSearchComponent,
    CardsComponent,
    PlayComponent,
    LoginComponent,
    CreateDeckComponent,
    CreateCardComponent,
    RegisterComponent,
    CardsDetailDeleteComponent
  ],
  providers: [ DeckService, CardService, AuthService ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
