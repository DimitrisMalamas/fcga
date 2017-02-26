import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../card';

import { CardService } from '../card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [ CardService ]
})
export class CardsComponent implements OnInit {
  @Input() deckId: number = null;

  cards: Card[];
  selectedCard: Card;
  //put it now
  stared : Card[] = [];
  constructor(private cardService: CardService) { }

  getCards(): void {
    this.cardService.getCards(this.deckId).then(cards => {
      this.cards = cards;
      this.selectedCard = cards[0];
    });
  }
  // goPlay(): void {
  //   this.route.params.forEach((params: Params) => {
  //     let id = +params['id'];
  //     this.router.navigate(['/play', id])
  //   });
  // }

  ngOnInit(): void {
    this.getCards();

  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }
  //put it now
  onStar(card: Card): void{
    this.stared.push(card);
  }

  onRemove(card: Card): void{
    this.stared.splice(this.stared.indexOf(card), 1);
  }
}
