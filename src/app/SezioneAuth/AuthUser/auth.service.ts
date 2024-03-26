import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){}

  isLoggedIn  = true;


  isAuthenticade(){
    return this.isLoggedIn
  }
}
