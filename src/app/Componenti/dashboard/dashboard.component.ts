import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IToDoItem } from '../../Models/i-to-do-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

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
