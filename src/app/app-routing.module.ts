import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './Componenti/todo-list/todo-list.component';
import { AttivitaGiornaliereComponent } from './Componenti/attivita-giornaliere/attivita-giornaliere.component';
import { ProfiloComponent } from './Componenti/profilo/profilo.component';
import { DashboardComponent } from './Componenti/dashboard/dashboard.component';

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
