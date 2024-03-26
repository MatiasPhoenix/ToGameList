import { FirebaseService } from './../../../SezioneAuth/Firebase/firebase.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IToDoItem } from '../../../Models/i-to-do-item';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private http      : HttpClient,
    private firebase  : FirebaseService,
    ) {}

  numeroTodo!           : number;
  arrayTodoList         : IToDoItem[] = [];
  urlTodoList           : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/todoList'

  numeroAbitudini!      : number;
  arrayAbitudiniList    : IToDoItem[] = [];
  urlAbitudini          : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/abitudini'

  numeroAttGiornaliere! : number;
  arrayAttGiorList      : IToDoItem[] = [];
  urlAttiGiornaliere    : string = 'https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/attivitaGiornaliere'


  ngOnInit(){
    this.getListTodo()
    this.getListAttGior()
    this.getListAbitudini()
  }

//Metodi che caricano su array locali, tutte le informazioni dei DB
  getListTodo(){
    this.firebase.caricaTodoList(this.urlTodoList+'.json')
      .subscribe((data:any) => {
        this.arrayTodoList = Object.keys(data)
        .map((key)=> {return data[key]})
        this.numeroTodo = this.arrayTodoList.length;
    })
  }
  getListAbitudini(){
    this.firebase.caricaTodoList(this.urlAbitudini+'.json')
      .subscribe((data:any) => {
      this.arrayAbitudiniList = Object.keys(data)
      .map((key)=> {return data[key]})
      this.numeroAbitudini = this.arrayAbitudiniList.length;
    })
  }
  getListAttGior(){
    this.firebase.caricaTodoList(this.urlAttiGiornaliere+'.json')
      .subscribe((data:any) => {
      this.arrayAttGiorList = Object.keys(data)
      .map((key)=> {return data[key]})
      this.numeroAttGiornaliere = this.arrayAttGiorList.length;
    })
  }
}
