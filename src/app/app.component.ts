import { Component } from '@angular/core';
import { AuthService } from './SezioneAuth/AuthUser/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private authservice : AuthService
  ){}

  title = 'togamelist';

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.authservice.createUser(user.email, user.id, user._token, user._expirationDate);
    }
  }

  goLogOut(){
    this.authservice.logOut();
  }
}
