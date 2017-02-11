import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import { DeckDetailComponent } from '../deck-detail/deck-detail.component';
import { DeckService } from '../deck.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit {
  decks : Deck[];
  constructor(private router: Router,
              private deckService: DeckService,
              private authService: AuthService) { }

  ngOnInit() {
  }
  add(title: string, category: string, description: string): void {
    title = title.trim();
    category = category.trim();
    description = description.trim();
    if (!title) { return; }
    this.deckService.create(title, category, description);
    this.router.navigate(['/decks'])
  }
}
