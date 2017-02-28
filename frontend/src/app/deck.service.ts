import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';
import { Deck } from './deck';

@Injectable()
export class DeckService {
  private decksUrl = 'flipcards/decks/';
  private decksUrl2 = 'flipcards/udecks/';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http, private authService: AuthService) { }

  getDecks(): Promise<Deck[]> {
    return this.http.get(this.decksUrl)
     .toPromise()
     .then(response => {
       console.log(response.json()); return response.json() as Deck[];
     })
    .catch(this.handleError);
  }

  getUserDecks(): Promise<Deck[]> {

    let postHeaders = new Headers(this.headers);
    postHeaders.append('Authorization', `JWT ${this.authService.token}`);
    return this.http.get(this.decksUrl2, {headers: postHeaders})
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

  create(title: string, category: string, description: string): Promise <Deck> {
    const UdecksUrl = `flipcards/udecks/`;
    let postHeaders = new Headers(this.headers);
    postHeaders.append('Authorization', `JWT ${this.authService.token}`);
    console.log(postHeaders);
    return this.http
      .post(UdecksUrl,
            JSON.stringify({ title: title,
                             category: category,
                             description: description,
                             cards: [] }),
            { headers: postHeaders })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.decksUrl}${id}`;
    let postHeaders = new Headers(this.headers);
    postHeaders.append('Authorization', `JWT ${this.authService.token}`);
    return this.http.delete(url, {headers: postHeaders})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
