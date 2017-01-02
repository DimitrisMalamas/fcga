import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DeckService } from '../deck.service';
import { Router } from '@angular/router';

import { Deck } from '../deck';

@Component({
  selector: 'deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: [ './deck-detail.component.css' ]
})
export class DeckDetailComponent {
  deck: Deck;

  constructor(private deckService: DeckService,
              private router: Router,
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
  goPlay(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.router.navigate(['/play', id])
    });
  }
}
