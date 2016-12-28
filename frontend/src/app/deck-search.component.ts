import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DeckSearchService } from './deck-search.service';
import { Deck } from './deck';

@Component({
  selector: 'deck-search',
  templateUrl: './deck-search.component.html',
  styleUrls: [ './deck-search.component.css' ],
  providers: [DeckSearchService]
})
export class DeckSearchComponent implements OnInit {
  decks: Observable<Deck[]>;
  private searchTerms = new Subject<string>();

  constructor(private deckSearchService: DeckSearchService,
              private router: Router) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.decks = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as prev
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.deckSearchService.search(term)
        // or the observable of empty decks if no search term
        : Observable.of<Deck[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Deck[]>([]);
      });
  }

  gotoDetail(deck: Deck): void {
    let link = ['/detail', deck.id];
    this.router.navigate(link);
  }
}
