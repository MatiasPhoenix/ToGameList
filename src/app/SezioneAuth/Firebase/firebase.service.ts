import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DataToUpdate {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    private http  : HttpClient
    ){}


//Sezione ToDo-List

    //Aggiunge elemento todoList
    aggiungiTodoList(url : string, body : {}){
      return this.http.post(url, body);
    }

    //Carica elementi todoList dal DB
    caricaTodoList(url : string){
      return this.http.get(url);
    }

    //Cancella elemento todoList
    cancellaTodoList(url : string, id : string){
      return this.http.delete(`${url}/${id}.json`)
    }


//Sezione Attività giornaliere

    //Completa attività giornaliera
    attivitaFinitaFirebase(url: string, id: string){ {
      return this.http.patch(`${url}/${id}.json`, { completed: true });
    }}

    //Ripristina attività giornaliera
    ripristinaAttivitaFirebase(url: string, id: string){ {
      return this.http.patch(`${url}/${id}.json`, { completed: false });
    }}

//Sezione aggiornamento del giorno

    //Aggiunge elemento Data a DB
    dataPost(url: string, data: number) {
      return this.http.post(url, data);
    }

    //Carica elemento Data dal DB
    dataGet(url : string){
      return this.http.get(url);
    }

    //Modifica elemento Data dal DB
    dataPatch(url: string, itemId: string, newValue: number) {
      const dataToUpdate: DataToUpdate = {};
      dataToUpdate[itemId] = newValue;
      return this.http.patch(`${url}.json`, dataToUpdate);
    }




}
