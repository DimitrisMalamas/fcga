import { Component, OnInit } from '@angular/core';
import { Deck } from './deck';
import { DeckDetailComponent } from './deck-detail.component';
import { DeckService } from './deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
  providers: [DeckService],
})
export class DecksComponent implements OnInit{
  decks : Deck[];
  selectedDeck: Deck;

  constructor(private router: Router,
              private deckService: DeckService) { }

  getDecks(): void {
    this.deckService.getDecks().then(decks => this.decks = decks);
  }

  ngOnInit(): void {
    this.getDecks();
  }

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedDeck.id]);
  }
}
