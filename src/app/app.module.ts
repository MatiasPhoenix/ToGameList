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
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { AbitudiniComponent } from './Componenti/SezioniApp/abitudini/abitudini.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './Componenti/SezioneUser/log-in/log-in.component';
import { RegisterComponent } from './Componenti/SezioneUser/register/register.component';


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
    AbitudiniComponent,
    LogInComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"togamelist-e79bb","appId":"1:260277503096:web:073431a08c534fcfe0998d","databaseURL":"https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"togamelist-e79bb.appspot.com","apiKey":"AIzaSyCl4f_xm7FLbou4mufnYCRmWeh708Dgpw0","authDomain":"togamelist-e79bb.firebaseapp.com","messagingSenderId":"260277503096"})),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
