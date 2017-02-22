import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'FCGA';
  fullImagePath: string;
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
  constructor(private router: Router) {
    this.tabs[0].active = true;
    this.fullImagePath = '/assets/copy.png';
  }
  // constructor(private authService: AuthService) { }
}
