import { Component, OnInit } from '@angular/core';

import { Deck } from '../deck';
import { DeckService } from '../deck.service';
import { DeckSearchService } from '../deck-search.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  providers: [DeckSearchService]
})
export class DashboardComponent implements OnInit {

  decks: Deck[] = [];

  constructor(private deckService: DeckService,
              private deckSearchService: DeckSearchService) { }

  categories = ['Other', 'Biology', 'Science', 'Geography', 'History', 'Literature', 'Chemistry', 'Fun'];
  selectedCategory: string;
  category : string;

  ngOnInit(): void {
    this.selectedCategory = 'All decks';
    this.deckService.getDecks()
      .then(decks => this.decks = decks);
  }

  onSelect(category: string): void {
    this.selectedCategory = category;
    this.deckSearchService.getDecksPerCategory(category)
      .then(decks => this.decks = decks);
  }

  gotoDetail(deck: Deck): void { /* TODO */ }

}
