import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Card } from '../card';
import { Location } from '@angular/common';
import { CardService } from '../card.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cards-detail',
  templateUrl: './cards-detail-delete.component.html',
  styleUrls: ['./cards-detail-delete.component.css'],
  providers: [ CardService ]
})
export class CardsDetailDeleteComponent implements OnInit {
  deckId: number;
  cards: Card[];
  selectedCard: Card;

  constructor(private cardService: CardService,
              private route: ActivatedRoute,
              private location: Location,
              private authService: AuthService) { }

  getCards(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.deckId = id;
      this.cardService.getCards(id)
        .then(cards => this.cards = cards);
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

  goBack(): void {
    this.location.back();
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }
  delete(card: Card): void {
    this.cardService
      .delete(this.deckId, card.id)
      .then(() => {
        this.cards = this.cards.filter(d => d !== card);
        if (this.selectedCard === card) { this.selectedCard = null; }
      });
  }
}
