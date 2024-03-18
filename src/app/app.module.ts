import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './Componenti/todo-list/todo-list.component';
import { ProfiloComponent } from './Componenti/profilo/profilo.component';
import { AttivitaGiornaliereComponent } from './Componenti/attivita-giornaliere/attivita-giornaliere.component';
import { BarraInferioreComponent } from './Componenti/barra-inferiore/barra-inferiore.component';
import { InGameComponent } from './Componenti/in-game/in-game.component';
import { DashboardComponent } from './Componenti/dashboard/dashboard.component';
import { AggiungiElementoComponent } from './Componenti/aggiungi-elemento/aggiungi-elemento.component';

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
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
