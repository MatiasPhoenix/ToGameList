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

  dataUpdate!  : string
  currentUser! : IUser
  newAttivita! : IToDoItem
  attivitaList : IToDoItem[] = [];
  url          : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/attivitaGiornaliere'
  urlUpdate    : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/updateGiornaliero'

  ngOnInit() {
  this.getTodoList()
  }

  dataUpgrade(data : string){

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
                this.attivitaList = Object.values(data);
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
          id         : this.generateRandomId(),
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

  //Metodo che completa(o ripristina) l'attività del giorno, senza cancellarla
  attivitaFinita(id: string) {
    this.firebase.caricaTodoList(this.url + '.json')
      .subscribe((data: any) => {

        if (data) {
          const keys = Object.keys(data);
          for (const key of keys) {
            const item = data[key];

            if (item.id === id) {
              console.log('Messaggio -->', item.id);

              if (!item.completed) {
                this.firebase.attivitaFinitaFirebase(this.url, key)
                  .subscribe(() => {
                    this.reloadPage()
                    console.log('Stato completato aggiornato con successo per il task:', item.task);
                  }, (error) => {
                    console.error('Errore durante l\'aggiornamento dello stato completato per il task:', item.task, error);
                  });
              } else {
                this.firebase.ripristinaAttivitaFirebase(this.url, key)
                  .subscribe(() => {
                    this.reloadPage()
                    console.log('Stato completato aggiornato con successo per il task:', item.task);
                  }, (error) => {
                    console.error('Errore durante l\'aggiornamento dello stato completato per il task:', item.task, error);
                  });
                console.log('Hai già completato questa attività per il task:', item.task);
              }
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

  //Metodo generatore casuale di id
  generateRandomId(): string {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let randomId = '';
   for (let i = 0; i < 4; i++) {
     randomId += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return randomId;
  }

  //Piccolo metodo che ricarica la pagina
  //Utile per "aggiornamenti di stato" rapidi
  reloadPage() {
    window.location.reload();
  }
}
