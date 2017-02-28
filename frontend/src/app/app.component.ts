import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Flip Cards';
  fullImagePath: string;
  loggedin: boolean;
  tabs: Array<any> = [
    {title: 'Dashboard', path: '/dashboard'},
    {title: 'My Decks', path: '/decks'},
    {title: 'Login', path: '/login'},
    {title: 'Sign Up', path: '/signUp'},
    {title: 'Create Deck', path: '/createDeck'}
  ];


  navigate(path: string) {
    this.router.navigate([path]);
  }
  constructor(private router: Router,
              private authService: AuthService) {
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser != null && currentUser.token != null) {
  this.loggedin = true;
  let loginIndex = this.tabs.length - 3;
  this.tabs[loginIndex].title = 'Logout';
}
    this.tabs[0].active = true;
    this.fullImagePath = '/assets/img/logo.png';
  }
  // constructor(private authService: AuthService) { }
}
