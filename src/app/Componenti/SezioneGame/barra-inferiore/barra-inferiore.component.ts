import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-inferiore',
  templateUrl: './barra-inferiore.component.html',
  styleUrl: './barra-inferiore.component.scss'
})
export class BarraInferioreComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
