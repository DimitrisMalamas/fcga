import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DeckSearchService } from '../deck-search.service';
import { Deck } from '../deck';
import { TypeaheadMatch } from 'ng2-bootstrap';
@Component({
  selector: 'deck-search',
  templateUrl: './deck-search.component.html',
  styleUrls: [ './deck-search.component.css' ],
  providers: [DeckSearchService]
})
export class DeckSearchComponent {
  matchingDecks: Observable<Deck[]>;
  searchTerm: string = '';

  constructor(private deckSearchService: DeckSearchService,
              private router: Router) {
    this.matchingDecks = Observable.create((observer: any) => {
      observer.next(this.searchTerm);
    }).mergeMap((term: string) => this.getDecksAsObservable(term));
  }

  getDecksAsObservable(term: string): Observable<Deck[]> {
    return this.deckSearchService.search(term)
      .debounceTime(300)
      .distinctUntilChanged();
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.gotoDetail(e.item);
  }

  gotoDetail(deck: Deck): void {
    let link = ['/detail', deck.id];
    this.router.navigate(link);
  }
}
