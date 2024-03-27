import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';
import { IUser } from '../../../Models/i-user';
import { IToDoItem } from '../../../Models/i-to-do-item';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-attivita-giornaliere',
  templateUrl: './attivita-giornaliere.component.html',
  styleUrl: './attivita-giornaliere.component.scss'
})
export class AttivitaGiornaliereComponent implements OnInit {

  constructor(
    private http      : HttpClient,
    private firebase  : FirebaseService,
    ) {}

  newData      : number = 0;
  dataUpdate!  : number;
  idDB!        : string;
  currentUser! : IUser;
  newAttivita! : IToDoItem;
  attivitaList : IToDoItem[] = [];
  url          : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/attivitaGiornaliere'
  urlUpdate    : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/updateGiornaliero'

  ngOnInit() {
    this.getTodoList();
    this.testGiorno();
  }

//Sezione metodi dedicati alle attività giornaliere
//metodi -> modifica, aggiorna, cancella e DB

  //Metodo crea oggetto Attività giornaliere con POST -> DB
  todoFactory(){
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
  cancellaElemento(id: string){
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
  attivitaFinita(id: string){
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
                    this.getTodoList()
                    console.log('Stato completato aggiornato con successo per il task:', item.task);
                  }, (error) => {
                    console.error('Errore durante l\'aggiornamento dello stato completato per il task:', item.task, error);
                  });
              } else {
                this.firebase.ripristinaAttivitaFirebase(this.url, key)
                  .subscribe(() => {

                    this.getTodoList()
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
  generateRandomId(): string{
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let randomId = '';
   for (let i = 0; i < 4; i++) {
     randomId += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return randomId;
  }

  //Piccolo metodo che ricarica la pagina
  //Utile per "aggiornamenti di stato" rapidi
  reloadPage(){
    window.location.reload();
  }


//Sezione con metodi per verifiche giornaliere,
//ripristino attività e confronto dati DB

  //Metodo che crea oggetto con una data in DB
  //da usare nella creazione del profilo SOLO UNA VOLTA
  dataPost(){
    let oggi = this.dataGiornaliera()
    this.firebase.dataPost(this.urlUpdate + '.json', oggi)
      .subscribe(data => {})
  }

  //Metodo che prende il giorno sotto forma di numero dal DB
  //Serve per i confronti e per riprisitinare ogni giorno le attività giornaliere
  //Modifica variabile dataUpdate--
  localDataGet(){
    this.dataUpdate = 0;
    // console.log('eccomi');

    this.firebase.dataGet(this.urlUpdate)
    .subscribe((data) => {
      const values = Object.values(data);
      // console.log('eccomi di nuovo ' + values);

      if (values.length > 0) {
        const firstValue = values[0];
        // console.log('eccomi di nuovo ' + firstValue);
        if (typeof firstValue === 'number') {
          let questoTestGiorno = this.dataGiornaliera()

          // console.log('eccomi di nuovo ' + firstValue + ' numero di oggi ->' +testGiorno);
          if (questoTestGiorno === firstValue){
            console.log('......testGiorno e firstValue sono uguali ' + this.dataUpdate + ' ' + firstValue);

            return this.dataUpdate = firstValue;

        }else{
          // console.log('fo na sega');
          // console.log(this.dataUpdate);

        }
        } else {
          return console.error('Il primo valore dell\'array non è di tipo number:', firstValue);
        }
      } else {
        return console.error('Nessun valore trovato nell\'oggetto restituito:', data);
      }
      });
  }

  //Metodo che stabilisce che giorno è, sotto forma di numero
  dataGiornaliera(){
    const data = new Date;
    return data.getDay()
  }

  //Metodo che confronta le date(numeri) per verificare il passare dei giorni
  testGiorno(){
    this.newData = this.dataGiornaliera();
    this.localDataGet();
    this.idDBGiornaliero()
    // console.log('data -----> ' + this.dataUpdate);
    // console.log('data -----> ' + this.newData);

    if (this.dataUpdate !== this.newData){

      this.dataUpdate = this.newData
      this.ripristinoAttivita();
      this.dataPatchLocale()
      console.log('Il giorno era diverso, oggi è -> ' + this.dataUpdate);

    }else{
      console.log(this.newData + " " + this.dataUpdate);

      console.log('-Adesso è lo stesso giorno ovunque-' );
      console.log('-e sono state ripristinate tutte le attività-' );

    }
  }

  //Metodo che ripristina tutte le attività quando cambia il giorno
  ripristinoAttivita(){
    for (let i = 0; i < this.attivitaList.length; i++) {
      let att = this.attivitaList[i];
      if (att.completed === true) {
        this.attivitaFinita(att.id);
        // console.log(att.id + ' modificato');
      }else{
      console.log("no problemo jefe!");
      }
    }
  }

  //Metodo che modifica data in DB
  dataPatchLocale(){
    const newValue = this.dataGiornaliera();

    this.firebase.dataPatch(this.urlUpdate, this.idDB, newValue)
      .subscribe(() => {
        // console.log('Campo aggiornato con successo.');
      }, error => {
        console.error('Errore durante l\'aggiornamento del campo:', error);
      });
  }

  //Metodo che prende id dall'oggetto in DB
  //così da modificarlo facilmente
  idDBGiornaliero(){
    this.firebase.dataGet(this.urlUpdate)
      .subscribe((data) => {
        const chiave = Object.keys(data)[0];
        return this.idDB = chiave;
        // console.log('Chiave dell\'oggetto del DB ->', chiave);
      })
  }

//Metodi per modificare testo del elemento
  modificaAttivitaButton(id: string) {
    Swal.fire({
      title: 'Modifica questo elemento',
      input: 'text',
      inputPlaceholder: 'Modifica todo list',
      showCancelButton: true,
      confirmButtonText: 'Modifica',
      cancelButtonText: 'Annulla',
      showLoaderOnConfirm: true,

      preConfirm: (val) => {
        this.modificaAttivita(id, val)
      }
      }).then((result) => {

      if (result.isConfirmed) {
        console.log('Elemento aggiunto');
      }
      });
  }
  modificaAttivita(id: string, testo : string) {
    this.firebase.caricaTodoList(this.url + '.json')
      .subscribe((data: any) => {

        if (data) {
          const keys = Object.keys(data);
          for (const key of keys) {
            const item = data[key];

            if (item.id === id) {
              console.log('Messaggio -->', item.id);

              if (!item.completed || item.completed) {
                this.firebase.aggiornaTodoList(this.url, key, item.task = testo)
                  .subscribe(() => {
                    this.getTodoList()
                    console.log('Stato completato aggiornato con successo per il task:', item.task);
                  }, (error) => {
                    console.error('Errore durante l\'aggiornamento dello stato completato per il task:', item.task, error);
                  });
              } else {
                this.firebase.ripristinaAttivitaFirebase(this.url, key)
                  .subscribe(() => {
                    this.getTodoList()
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

}
