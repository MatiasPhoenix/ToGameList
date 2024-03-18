import { Component } from '@angular/core';
import { IToDoItem } from '../../../Models/i-to-do-item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {


  toDoList: IToDoItem[] = [];

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
        this.toDoList.push(newToDoItem);
        console.log(this.toDoList);

      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Elemento aggiunto');
      }
      });
    }

}
