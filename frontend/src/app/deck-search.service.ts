import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Deck } from './deck';

@Injectable()
export class DeckSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Deck[]> {
    return this.http
      .get(`flipcards/decks/?title=${term}`)
      .map((r: Response) => r.json() as Deck[]);
  }
  getDecksPerCategory(category: string): Promise<Deck[]> {
    return this.http
      .get(`flipcards/decks/?category=${category}`)
      .toPromise()
      .then(response => {
        console.log(response.json()); return response.json() as Deck[];
      })
  }

}
