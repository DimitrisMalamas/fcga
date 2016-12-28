import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DeckService } from './deck.service';

import { Deck } from './deck';

@Component({
  selector: 'play',
  templateUrl: './play.component.html'
})
export class PlayComponent {
  deck: Deck;

  constructor(private deckService: DeckService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.deckService.getDeck(id)
        .then(deck => this.deck = deck);
    });
  }
  goBack(): void {
    this.location.back();
  }
}
