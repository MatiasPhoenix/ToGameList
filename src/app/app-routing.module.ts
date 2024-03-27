import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './Componenti/SezioniApp/todo-list/todo-list.component';
import { AttivitaGiornaliereComponent } from './Componenti/SezioniApp/attivita-giornaliere/attivita-giornaliere.component';
import { ProfiloComponent } from './Componenti/SezioneGame/profilo/profilo.component';
import { DashboardComponent } from './Componenti/SezioniApp/dashboard/dashboard.component';
import { AbitudiniComponent } from './Componenti/SezioniApp/abitudini/abitudini.component';
import { RegisterComponent } from './Componenti/SezioneUser/register/register.component';
import { LogInComponent } from './Componenti/SezioneUser/log-in/log-in.component';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: 'dashboard'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LogInComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'todoList', component: TodoListComponent},
  { path: 'attivitaGiornaliere', component: AttivitaGiornaliereComponent},
  { path: 'abitudini', component: AbitudiniComponent},
  { path: 'profilo', component: ProfiloComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
