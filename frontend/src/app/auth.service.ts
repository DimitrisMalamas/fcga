import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class AuthService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  isLoggedIn: boolean = false;

  token: string = null;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username, password): Promise<boolean> {
    const authUrl = `api-token-auth/`;
    return this.http
      .post(authUrl,
            JSON.stringify({ username: username,
                             password: password }),
        { headers: this.headers })
        .toPromise()
        .then(res => { let results = res.json();
                       if (results['token']) {
                         this.token = results['token'];
                         localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
                         this.isLoggedIn = true;
                         return true;
                       } else {
                         return false;
                       }
                     })
        .catch(this.handleError);
  }



  logout(): void {
    this.isLoggedIn = false;
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  signup(username, email, password): Promise<any> {
    const authUrl = 'flipcards/users/';
    return this.http
      .post(authUrl,
            JSON.stringify({ username: username,
                             email: email,
                             password: password }),
        { headers: this.headers })
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }
}
