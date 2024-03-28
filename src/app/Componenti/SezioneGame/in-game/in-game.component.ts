
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
  marginSize        : number = 830;
  marginSizeTop     : number = 30;

//In battaglia
  applyMargin       : boolean = false;
  applyMarginEnemy  : boolean = false;

//Avatar sprites
  avatarStandards   : boolean = true;
  avatarAttacco     : boolean = false;

  isVisible         : boolean = true;
  battleGround      : boolean = true;
  charAndScenario   : boolean = false;

  ngOnInit(){
    // setTimeout(() => {
    //   this.isVisible = false;
    // }, 5000);
  }

  toBattle(){
    if(this.battleGround == false){
      this.pgToBattle()
      return this.battleGround = true;
    }else{
      this.pgToBattle()
      return this.battleGround = false;
    }
  }

  pgToBattle(){
    if(this.charAndScenario == true){
      return this.charAndScenario = false;
    }else{
      return this.charAndScenario = true;
    }
  }

  attackMove(){
    if(this.applyMargin == false){
      this.avatarStandards = false;
      this.avatarAttacco = true;
      setTimeout(() => {
        this.applyMarginEnemy = true;
      }, 150);
      setTimeout(() => {
        this.avatarStandards = true;
        this.avatarAttacco = false;
        this.applyMargin = false;
      }, 500);
      setTimeout(() => {
        this.applyMarginEnemy = false;
      }, 200);
      return this.applyMargin = true;
    }else{
      return console.log('fatti na sega');
    }
  }

  pgColpito(){
    setTimeout(() => {
      this.applyMargin = false;
    }, 500);
    setTimeout(() => {
      this.applyMargin = false;
    }, 500);
    setTimeout(() => {
      this.applyMargin = false;
    }, 500);
    setTimeout(() => {
      this.applyMargin = false;
    }, 500);
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
