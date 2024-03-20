import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';
import { IUser } from '../../../Models/i-user';
import { IToDoItem } from '../../../Models/i-to-do-item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attivita-giornaliere',
  templateUrl: './attivita-giornaliere.component.html',
  styleUrl: './attivita-giornaliere.component.scss'
})
export class AttivitaGiornaliereComponent {

  constructor(
    private http      : HttpClient,
    private firebase  : FirebaseService,
    ) {}

  currentUser! : IUser
  newAttivita! : IToDoItem
  attivitaList : IToDoItem[] = [];
  url          : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/attivitaGiornaliere'

  ngOnInit() {
  this.getTodoList()
  }

  //Metodo crea oggetto Attività giornaliere con POST -> DB
  todoFactory() {
   this.firebase.aggiungiTodoList(
    this.url + '.json',
    {
      id         : this.newAttivita.id,
      task       : this.newAttivita.task,
      completed  : this.newAttivita.completed,
      contatore  : this.newAttivita.contatore
    })
    .subscribe(data => {
      console.log(data);
    })
  }

  //Metodo get->DB->array locale(Attività giornaliere)
  getTodoList(){
    this.firebase.caricaTodoList(this.url+'.json')
      .subscribe((data:any) => {
      this.attivitaList = Object.keys(data)
      .map((key)=> {return data[key]})
      // console.log(this.attivitaList);
    })
  }

  //Metodo delete dal DB per Attività giornaliere (solo delete, non completa l'incarico)
  // cancellaElemento(id: number) {
  //   const itemId = id;
  //   this.firebase.caricaTodoList(this.url+'.json')
  //     .subscribe((data: any) => {

  //     if (data) {
  //       const keys = Object.keys(data);

  //       for (const key of keys) {
  //         const item = data[key];

  //         if (item.id === itemId) {
  //           this.firebase.cancellaTodoList(this.url, key)
  //             .subscribe((response: any) => {
  //               console.log('Elemento eliminato:', itemId);
  //               delete data[key];
  //               this.attivitaList = Object.values(data);
  //             }, (error) => {
  //               console.error('Errore durante l\'eliminazione dell\'elemento:', error);
  //             });
  //           break;
  //         }

  //       }
  //     } else {
  //       console.error('Errore: dati non ricevuti correttamente dal database.');
  //     }
  //     }, (error) => {
  //       console.error('Errore durante il caricamento dei dati dal database:', error);
  //     });
  // }

  //Metodo complete Attività giornaliere (non cancella, considera completo l'incarico)
  completaTodo(id : number){
    console.log('Bravo! chai completato l\'attività ' + id + '!');
    // this.cancellaElemento(id);
  }

 //Metodo per l'utente, SweetAlert che permette aggiungere elemento ad Attività giornaliere
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
          const newAttivitaTemp: IToDoItem = {
          id         : this.attivitaList.length + 1,
          task       : val,
          completed  : false
        };
        this.newAttivita = newAttivitaTemp;
        this.attivitaList.push(this.newAttivita);
        this.todoFactory()
        console.log(this.attivitaList);
      }
      }).then((result) => {

      if (result.isConfirmed) {
        console.log('Elemento aggiunto');
      }
      });
  }

}
