import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthService } from './auth.service';
import { Card } from './card';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class CardService {
  private cardsUrl = 'flipcards/decks/${deckId}/cards/';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http, private authService: AuthService) { }

  getCards(deckId: Number): Promise<Card[]> {
    const cardsUrl = `flipcards/decks/${deckId}/cards/`;
    return this.http.get(cardsUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Card[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(deckId: number, question: string, answer: string): Promise <Card> {
    const cardsUrl = `flipcards/decks/${deckId}/cards/`;
    let postHeaders = new Headers(this.headers);
    postHeaders.append('Authorization', `JWT ${this.authService.token}`);
    console.log(postHeaders);
    return this.http
      .post(cardsUrl,
            JSON.stringify({ deck_id: deckId,
                             question: question,
                             answer: answer }),
            { headers: postHeaders })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}
