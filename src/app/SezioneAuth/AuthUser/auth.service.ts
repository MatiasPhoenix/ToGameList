import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http  : HttpClient
    ){}

  user!             : User;
  isLoggedIn        = false;
  APIKey            = 'AIzaSyCl4f_xm7FLbou4mufnYCRmWeh708Dgpw0'
  urlSignUp         = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`;
  urlSignIn         = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKey}`;


  isAuthenticade(){
    return this.isLoggedIn
  }

  createUser(email : string, id : string, token: string, expirationDate: Date){
    this.user = new User(email, id, token, expirationDate);
    return this.isLoggedIn = true;
  }

  signUp(email: string, password: string){
    return this.http.post(this.urlSignUp, {email: email, password: password, returnSecureToken: true});
  }

  signIn(email: string, password: string){
    return this.http.post(this.urlSignIn, {email: email, password: password, returnSecureToken: true});
  }

  logOut(){
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }

  userLoggedIn(): boolean {
    if (this.isLoggedIn === true){
      return true;
    }else {
      return false;
    }
  }

  takeUser(){
    return this.user;
  }
}
