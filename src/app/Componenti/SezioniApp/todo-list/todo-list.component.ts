import { IUser } from './../../../Models/i-user';
import { IToDoItem } from '../../../Models/i-to-do-item';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  constructor(private http: HttpClient) {}

  currentUser! : IUser
  toDoList    : IToDoItem[] = [];

  ngOnInit(){

  }

  //Metodo che funziona con db.json

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
          id: this.toDoList.length + 1,
          task: val,
          completed: false
        };
        return this.http.post<IToDoItem>('http://localhost:3000/toDoList', newToDoItem).toPromise()
          .then(response => {
            this.toDoList.push(newToDoItem);
            console.log(this.toDoList);
            Swal.close();
          })
          .catch(error => {
            console.error(error);
            Swal.showValidationMessage('Errore durante l\'aggiunta dell\'elemento');
          });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Elemento aggiunto');
      }
    });
  }

  //Metodo che non tocca db.json

  // openSwal() {
  //   Swal.fire({
  //     title: 'Aggiungi elemento',
  //     input: 'text',
  //     inputPlaceholder: 'Inserisci qualcosa...',
  //     showCancelButton: true,
  //     confirmButtonText: 'OK',
  //     cancelButtonText: 'Annulla',
  //     showLoaderOnConfirm: true,

  //     preConfirm: (val) => {
  //         const newToDoItem: IToDoItem = {
  //         id: this.toDoList.length + 1,
  //         task: val,
  //         completed: false
  //       };
  //       this.toDoList.push(newToDoItem);
  //       console.log(this.toDoList);
  //     }
  //     }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log('Elemento aggiunto');
  //     }
  //     });
  //   }

  cancellaElemento(id:number) {
    let item = this.toDoList.findIndex(o => o.id === id);
    if (item !== -1) {
      this.toDoList.splice(item, 1);
    }
  }

}
