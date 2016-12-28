import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Deck } from './deck';

@Injectable()
export class DeckService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private decksUrl = 'fcga/decks/';

  constructor(private http: Http) { }

  getDecks(): Promise<Deck[]> {
    return this.http.get(this.decksUrl)
      .toPromise()
      .then(response => {
        console.log(response.json()); return response.json() as Deck[];
      })
      .catch(this.handleError);
  }


  getDeck(id: number): Promise<Deck> {
    return this.getDecks()
      .then(decks => decks.find(deck => deck.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
