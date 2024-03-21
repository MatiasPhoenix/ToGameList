import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';
import { IUser } from './../../../Models/i-user';
import { IToDoItem } from '../../../Models/i-to-do-item';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { FactoryTarget } from '@angular/compiler';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  constructor(
    private http      : HttpClient,
    private firebase  : FirebaseService,
    ) {}

  currentUser! : IUser
  newTodoList! : IToDoItem
  toDoList     : IToDoItem[] = [];
  url          : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/todoList'

  ngOnInit() {
  this.getTodoList()
  }

  //Metodo crea oggetto todoList con POST -> DB
  todoFactory() {
   this.firebase.aggiungiTodoList(
    this.url + '.json',
    {
      id         : this.newTodoList.id,
      task       : this.newTodoList.task,
      completed  : this.newTodoList.completed
    })
    .subscribe(data => {
      console.log(data);
    })
  }

  //Metodo get->DB->array locale(toDoList)
  getTodoList(){
        this.firebase.caricaTodoList(this.url+'.json')
      .subscribe((data:any) => {
      this.toDoList = Object.keys(data)
      .map((key)=> {return data[key]})
      // console.log(this.toDoList);
    })
  }

  //Metodo delete dal DB per todoList (solo delete, non completa l'incarico)
  cancellaElemento(id: string) {
    const itemId = id;
    this.firebase.caricaTodoList(this.url+'.json')
      .subscribe((data: any) => {

      if (data) {
        const keys = Object.keys(data);

        for (const key of keys) {
          const item = data[key];

          if (item.id === itemId) {
            this.firebase.cancellaTodoList(this.url, key)
              .subscribe((response: any) => {
                console.log('Elemento eliminato:', itemId);
                delete data[key];
                this.toDoList = Object.values(data);
              }, (error) => {
                console.error('Errore durante l\'eliminazione dell\'elemento:', error);
              });
            break;
          }

        }
      } else {
        console.error('Errore: dati non ricevuti correttamente dal database.');
      }
      }, (error) => {
        console.error('Errore durante il caricamento dei dati dal database:', error);
      });
  }

  //Metodo delete/complete todoList (cancella DB e considera completo l'incarico)
  completaTodo(id : string){
    console.log('Bravo! chai completato la todoList ' + id + '!');
    this.cancellaElemento(id);
  }

 //Metodo per l'utente, SweetAlert che permette aggiungere elemento a todoList
  openSwal() {
    Swal.fire({
      title: 'Aggiungi elemento',
      input: 'text',
      inputPlaceholder: 'Inserisci qualcosa...',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Annulla',
      showLoaderOnConfirm: true,

      preConfirm: (val) => {
          const newToDoItem: IToDoItem = {
          id         : this.generateRandomId(),
          task       : val,
          completed  : false
        };
        this.newTodoList = newToDoItem;
        this.toDoList.push(this.newTodoList);
        this.todoFactory()
        console.log(this.toDoList);
      }
      }).then((result) => {

      if (result.isConfirmed) {
        console.log('Elemento aggiunto');
      }
      });
  }

  //Metodo che crea id alfanumerico random
  generateRandomId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 4; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
   }

}
