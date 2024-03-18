import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './Componenti/SezioniApp/todo-list/todo-list.component';
import { AttivitaGiornaliereComponent } from './Componenti/SezioniApp/attivita-giornaliere/attivita-giornaliere.component';
import { ProfiloComponent } from './Componenti/SezioneGame/profilo/profilo.component';
import { DashboardComponent } from './Componenti/SezioniApp/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'todoList', component: TodoListComponent},
  { path: 'attivitaGiornaliere', component: AttivitaGiornaliereComponent},
  { path: 'profilo', component: ProfiloComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
