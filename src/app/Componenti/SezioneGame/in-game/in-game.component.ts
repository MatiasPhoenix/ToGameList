
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.scss'
})
export class InGameComponent implements OnInit  {
constructor(){}

  paddingDx         : number = 0
  paddingSx         : number = 7;
  marginSize        : number = 30;
  marginSizeTop     : number = 30;

  ngOnInit(){
  }


  moveSx(){
    if(this.marginSize > 0){
      if(this.paddingDx > this.paddingSx){
        this.marginSize -= 30;
        console.log('vado 40 a sinistra');
      }else{
        this.paddingSx = 0;
        this.paddingDx += 7;
        this.marginSize -= 30;
        console.log('vado 40 a sinistra');
      }
    }
  }
  moveUp(){
    this.marginSizeTop += 30;
    console.log('vado 30 in su');
  }
  moveDown(){
    if(this.marginSizeTop > 0){
      this.marginSizeTop -= 30;
      console.log('vado 30 in giù');
    }
  }
  moveDx(){
    if(this.paddingSx > this.paddingDx){
      this.marginSize += 30;
      console.log('vado 40 a sinistra');
    }else{
      this.paddingDx = 0;
      this.paddingSx += 7;
      this.marginSize += 30;
      console.log('vado 40 a sinistra');
    }
  }
  reset(){
    this.marginSize = 30;
    this.marginSizeTop = 30;
  }
}
