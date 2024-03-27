import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../SezioneAuth/AuthUser/auth.service';
import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  constructor(
    private router            : Router,
    private authService       : AuthService,
    private firebaseService   : FirebaseService,
  ){}

  goLogOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
