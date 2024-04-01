import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../AuthUser/auth.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import { InGameComponent } from '../../Componenti/SezioneGame/in-game/in-game.component';

interface DataToUpdate {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    private http         : HttpClient,
    private authService  : AuthService

    ){}


//Sezione ToDo-List

    //Aggiunge elemento todoList
    aggiungiTodoList(url : string, body : {}){
      return this.http.post(`${url}?auth=${this.authService.user.token}`, body);
    }

    //Carica elementi todoList dal DB
    caricaTodoList(url : string){
      return this.http.get(`${url}?auth=${this.authService.user.token}`);
    }

    //Cancella elemento todoList
    cancellaTodoList(url : string, id : string){
      return this.http.delete(`${url}/${id}.json?auth=${this.authService.user.token}`);
    }


//Sezione Attività giornaliere

    // Completa attività giornaliera
attivitaFinitaFirebase(url: string, id: string) {
  return this.http.patch(`${url}/${id}.json?auth=${this.authService.user.token}`, { completed: true });
}

// Ripristina attività giornaliera
ripristinaAttivitaFirebase(url: string, id: string) {
  return this.http.patch(`${url}/${id}.json?auth=${this.authService.user.token}`, { completed: false });
}


//Sezione aggiornamento del giorno

    //Aggiunge elemento Data a DB
    dataPost(url: string, data: number) {
      return this.http.post(`${url}.json?auth=${this.authService.user.token}`, data);
    }

    //Carica elemento Data dal DB
    dataGet(url : string){
      return this.http.get(`${url}.json?auth=${this.authService.user.token}`);
    }

    //Modifica elemento Data dal DB
    dataPatch(url: string, itemId: string, newValue: number) {
      const dataToUpdate: DataToUpdate = {};
      dataToUpdate[itemId] = newValue;
      return this.http.patch(`${url}.json?auth=${this.authService.user.token}`, dataToUpdate);
    }

//Sezione Abitudini

    //Aggiorna abitudine
    aggiornaAbitudine(url: string, id: string, numero: number){ {
      return this.http.patch(`${url}/${id}.json?auth=${this.authService.user.token}`, { contatore: numero });
    }}

    aggiornaTodoList(url: string, id: string, testo: string){ {
      return this.http.patch(`${url}/${id}.json?auth=${this.authService.user.token}`, { task: testo });
    }}

//Sezione interazione con in-game.component

    //Aggiunge elemento todoList
    creaProfiloAvatar(url : string, body : {}){
      return this.http.post(`${url}?auth=${this.authService.user.token}`, body);
    }

    //Carica elementi todoList dal DB

    creaCodiceIdentificativo(url : string, body : {}){
      return this.http.post(`${url}?auth=${this.authService.user.token}`, body);
    }

    caricaProfiloAvatar(url : string){
        return this.http.get(`${url}?auth=${this.authService.user.token}`);
    }
    aggiornaProfiloAvatar(url: string, id : string, exp: number, gold: number,
      lvl: number, str: number, def: number, spd: number, life: number, stamina: number) {
      return this.http.patch(`${url}/${id}.json?auth=${this.authService.user.token}`, {

        profileAvatarLevel      : lvl,
        profileAvatarExp        : exp,
        profileAvatarGold       : gold,

        profileAvatarStrength   : str,
        profileAvatarArmor      : def,
        profileAvatarSpeed      : spd,

        profileAvatarLife       : life,
        profileAvatarStamina    : stamina,
      });
    }


}
