import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Card } from './card';

@Injectable()
export class CardService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) { }

  getCards(deckId: Number): Promise<Card[]> {
    const cardsUrl = `fcga/decks/${deckId}/cards/`;
    return this.http.get(cardsUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Card[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
