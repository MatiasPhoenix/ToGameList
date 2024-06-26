import { Component } from '@angular/core';
import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../Models/i-user';
import { IToDoItem } from '../../../Models/i-to-do-item';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-abitudini',
  templateUrl: './abitudini.component.html',
  styleUrl: './abitudini.component.scss'
})
export class AbitudiniComponent {

  constructor(
    private http      : HttpClient,
    private firebase  : FirebaseService,
    ) {}

  newData      : number = 0;
  dataUpdate!  : number
  idDB!        : string
  currentUser! : IUser
  newAttivita! : IToDoItem
  attivitaList : IToDoItem[] = [];
  url          : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/abitudini'
  urlUpdate    : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/updateGiornaliero'
  urlAvatar    : string = `https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/profiloAvatar`;

  ngOnInit() {
    this.getTodoList()
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
      title: 'Nuova abitudine?',
      input: 'text',
      inputPlaceholder: 'Inserisci qualcosa...',

      showCancelButton: true,
      confirmButtonText: '✔',
      cancelButtonText: '✖',
      showLoaderOnConfirm: true,

      confirmButtonColor: 'rgba(0, 0, 0, 0)',
      cancelButtonColor: 'rgba(0, 0, 0, 0)',
      background: 'rgba(0, 0, 0, 0)',
      backdrop: `
        rgba(0,0,123,0.4)
        url('../../../../assets/schermataAddTodoList.png')
        center
        no-repeat
        `,

      customClass: {
      popup: 'myPopupSweetAlert',
      confirmButton: 'confirmButton',
      cancelButton: 'custom-btn-class'
    },

      preConfirm: (val) => {
          const newAttivitaTemp: IToDoItem = {
          id         : this.generateRandomId(),
          task       : val,
          completed  : false,
          contatore  : 0
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

  //Metodo che completa una volta l'abitidune, senza cancellarla, aggiungendo un +1 al contatore
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
                this.firebase.aggiornaAbitudine(this.url, key, item.contatore + 1)
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

  //Metodo che ripristina l'abitudine, senza cancellarla
  ripristinaAbitudini(id: string){
    this.firebase.caricaTodoList(this.url + '.json')
      .subscribe((data: any) => {

        if (data) {
          const keys = Object.keys(data);
          for (const key of keys) {
            const item = data[key];

            if (item.id === id) {
              console.log('Messaggio -->', item.id);

              if (!item.completed) {
                this.firebase.aggiornaAbitudine(this.url, key, item.contatore = 0)
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

    this.firebase.dataGet(this.urlUpdate)
      .subscribe((data: any) => {
        const values = Object.values(data);

      if (values.length > 0) {
        const firstValue = values[0];

        if (typeof firstValue === 'number') {
          let testGiorno = this.dataGiornaliera()

          if (testGiorno === firstValue){
            this.dataUpdate = firstValue;

        }else{
        }
        } else {
          console.error('Il primo valore dell\'array non è di tipo number:', firstValue);
        }
      } else {
        console.error('Nessun valore trovato nell\'oggetto restituito:', data);
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
    console.log('data -----> ' + this.dataUpdate);
    console.log('data -----> ' + this.newData);

    if (this.dataUpdate !== this.newData){

      this.dataUpdate = this.newData
      this.ripristinoAttivita();
      this.dataPatchLocale()
      console.log('Il giorno era diverso, oggi è -> ' + this.dataUpdate);
      console.log('-e sono state ripristinate tutte le attività-' );
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
      if (att.completed === false) {
        this.ripristinaAbitudini(att.id);
        console.log(att.id + ' modificato');
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
        console.log('Campo aggiornato con successo.');
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
        this.idDB = chiave;
        console.log('Chiave dell\'oggetto del DB ->', chiave);
      })
  }

  //Metodi per modificare testo del elemento
  modificaAttivitaButton(id: string) {
    Swal.fire({
      title: 'Modifica abitudine',
      input: 'text',
      inputPlaceholder: 'Inserisci qualcosa...',

      showCancelButton: true,
      confirmButtonText: '✔',
      cancelButtonText: '✖',
      showLoaderOnConfirm: true,

      confirmButtonColor: 'rgba(0, 0, 0, 0)',
      cancelButtonColor: 'rgba(0, 0, 0, 0)',
      background: 'rgba(0, 0, 0, 0)',
      backdrop: `
        rgba(0,0,123,0.4)
        url('../../../../assets/schermataAddTodoList.png')
        center
        no-repeat
        `,

      customClass: {
      popup: 'myPopupSweetAlert',
      confirmButton: 'confirmButton',
      cancelButton: 'custom-btn-class'
    },

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

              if (!item.completed) {
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

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//      SEZIONE INTERAZIONE TRA COMPONENTE, DATABASE E GAME

caricaProfiloAvatar() {
  this.firebase.caricaProfiloAvatar(this.urlAvatar + '.json')
    .subscribe((data: any) => {
      const profileKey = Object.keys(data)[0];
      const dataProfiloAvatar = data[profileKey];

      let newLvl     = dataProfiloAvatar.profileAvatarLevel;

      let newGold    = dataProfiloAvatar.profileAvatarGold + 100;
      let newExp     = dataProfiloAvatar.profileAvatarExp + 50;

      let newStr     = dataProfiloAvatar.profileAvatarStrength;
      let newDef     = dataProfiloAvatar.profileAvatarArmor;
      let newSpd     = dataProfiloAvatar.profileAvatarSpeed;

      let newLife    = dataProfiloAvatar.profileAvatarLife;
      let newStamina = dataProfiloAvatar.profileAvatarStamina;

      if (newExp >= 100) {
        newExp -= 100;
        newLvl++;
        this.lvlUp = true;
        if (newLvl === 2){
        newLife +=2;
        newStamina +=2;
        }
        if (newLvl === 4){
        newLife +=2;
        newStamina +=2;
        }
        if (newLvl === 6){
        newLife +=2;
        }
      }



      this.firebase.aggiornaProfiloAvatar(this.urlAvatar, profileKey, newExp, newGold,
        newLvl, newStr, newDef, newSpd, newLife, newStamina )
                .subscribe(() => {

                  this.ricompensaMetod()
                  console.log('Stato completato aggiornato con successo per il task:');
                }, (error) => {
                  console.error('Errore durante l\'aggiornamento dello stato completato per il task');
                });
    }, (error) => {
      console.error('Errore durante il caricamento dei dati dal database:', error);
    });
}
lvlUp      : boolean = false;
ricompensa : boolean = false;
ricompensaMetod(){
  this.ricompensa = true;
  setTimeout(() => {
    this.ricompensa = false;
    this.lvlUp = false;
    window.location.reload();
  }, 1700);
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
}
