import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;

  constructor(public authService: AuthService, public router: Router, public appComponent: AppComponent) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(username, password) {
    this.message = 'Trying to log in ...';
    this.authService.login(username, password)
      .then(() => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          this.appComponent.tabs[0].active = true;
          let loginIndex = this.appComponent.tabs.length - 1;
          this.appComponent.tabs[loginIndex].title = 'Logout';
          this.router.navigate(['/']);
        }
      })
      .catch(error => this.message = error);
  }

  logout() {
    this.authService.logout();
    let loginIndex = this.appComponent.tabs.length - 1;
    this.appComponent.tabs[loginIndex].title = 'Login';
    this.setMessage();
  }
}
