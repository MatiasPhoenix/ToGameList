import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './Componenti/SezioniApp/todo-list/todo-list.component';
import { ProfiloComponent } from './Componenti/SezioneGame/profilo/profilo.component';
import { AttivitaGiornaliereComponent } from './Componenti/SezioniApp/attivita-giornaliere/attivita-giornaliere.component';
import { BarraInferioreComponent } from './Componenti/SezioneGame/barra-inferiore/barra-inferiore.component';
import { InGameComponent } from './Componenti/SezioneGame/in-game/in-game.component';
import { DashboardComponent } from './Componenti/SezioniApp/dashboard/dashboard.component';
import { AggiungiElementoComponent } from './Componenti/aggiungi-elemento/aggiungi-elemento.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodoListComponent,
    ProfiloComponent,
    AttivitaGiornaliereComponent,
    BarraInferioreComponent,
    InGameComponent,
    DashboardComponent,
    AggiungiElementoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
