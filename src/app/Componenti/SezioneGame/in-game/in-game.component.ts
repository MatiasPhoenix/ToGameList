import { AggiungiElementoComponent } from '../../aggiungi-elemento/aggiungi-elemento.component';
import { Component } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.scss'
})
export class InGameComponent {
constructor(){}

marginSize: number = 0;
marginSizeTop: number = 0;

moveSx(){
  if(this.marginSize > 0){
    this.marginSize -= 40;
    console.log('vado 40 a sinistra');
  }
}
moveUp(){
  this.marginSizeTop += 40;
  console.log('vado 40 in su');
}
moveDown(){
  if(this.marginSizeTop > 0){
    this.marginSizeTop -= 40;
    console.log('vado 40 in giù');
  }
}
moveDx(){
  this.marginSize += 40;
  console.log('vado 40 a destra');

}
}
