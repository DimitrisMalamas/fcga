import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import { DeckDetailComponent } from '../deck-detail/deck-detail.component';
import { DeckService } from '../deck.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
              private deckService: DeckService,
              private authService: AuthService) { }

  getDecks(): void {
    this.deckService.getUserDecks().then(decks => this.decks = decks);
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

  add(title: string, category: string, description: string): void {
    title = title.trim();
    category = category.trim();
    description = description.trim();
    if (!title) { return; }
        this.deckService.create(title, category, description)
      .then(deck => {
        this.decks.push(deck);
        this.selectedDeck = null;
    });
  }

  delete(deck: Deck): void {
    this.deckService
      .delete(deck.id)
      .then(() => {
        this.decks = this.decks.filter(d => d !== deck);
        if (this.selectedDeck === deck) { this.selectedDeck = null; }
      });
  }
}
