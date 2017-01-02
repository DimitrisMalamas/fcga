import { Component, OnInit } from '@angular/core';

import { Deck } from '../deck';
import { DeckService } from '../deck.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  decks: Deck[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.deckService.getDecks()
      .then(decks => this.decks = decks.slice(0, 4));
  }

  gotoDetail(deck: Deck): void { /* TODO */ }

}
