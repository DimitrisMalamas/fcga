import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(public authService: AuthService, public router: Router, public appComponent: AppComponent) {

  }

  ngOnInit() {
  }

  signup(username, email, password) {

    this.authService.signup(username, email, password)
      .then(() => {
          this.router.navigate(['/dashboard']);
        });
  }
}
