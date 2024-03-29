
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

//STATISTICHE AVATAR
  staminaPoints           : number = 10;

//In battaglia
  avatarColpisce          : boolean = false;
  enemyCopito             : boolean = false;
  enemyAttack             : boolean = false;
  enemyMistery            : boolean = true;
  enemyGoblinStandard     : boolean = false;
  enemyGoblinSkirmisher   : boolean = false;
  enemyMiniBoss           : boolean = true;
  iCantDefense            : boolean = true;
  avatarHitDefense        : boolean = false;

//In battaglia "dialoghi"
  enemyDefenseGoblin      : boolean = true;
  bothDefenseGoblin       : boolean = true;
  versusConcencGoblin     : boolean = true;
  enemyDefense            : boolean = true;
  bothDefense             : boolean = true;
  versusConcentrazione    : boolean = true;

//Avatar sprites
  avatarStandards         : boolean = true;
  avatarAttacco           : boolean = false;
  avatarDefense           : boolean = false;
  avatarSkillStart        : boolean = false;
  avatarSkillAtk          : boolean = false;
  avatarDamage            : boolean = false;

//Azioni nemico
  newEnemyAction          : string = '';
  enemyActions            : string[] = ['ATTACCO', 'DIFESA', 'ATTACCO X2']; // 'ATTACCO', 'DIFESA', 'PENSO', 'ATTACCO X2', 'MI CURO', 'ATTACCO'

//Gestione sezioni
  disableButton           : boolean = false;
  isVisible               : boolean = true;
  battleGround            : boolean = false;
  charAndScenario         : boolean = true;
  menuCampaign            : boolean = false;
  playerVictory!          : boolean;

/////////////
/////////////
/////////////
//MODIFICARE BATTLEGROUND E MINIBOSS
/////////////
/////////////
/////////////

  ngOnInit(){
    this.enemyNewAction()
    this.setLifeAvatar()
    setTimeout(() => {
      this.lifeMetod()
    }, 100);
  }

  enemyNewAction() {
    const indiceCasuale: number = Math.floor(Math.random()
    * this.enemyActions.length);
    return this.newEnemyAction = this.enemyActions[indiceCasuale];
  }

  chooseCamaign(){
    if (this.menuCampaign == false) {
      return this.menuCampaign = true;
    }else {
      this.toBattle();
      return this.menuCampaign = false;
    }
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
    if(this.avatarColpisce == false){
      this.avatarStandards = false;
      this.avatarAttacco = true;
      setTimeout(() => {
        this.enemyCopito = true;
      }, 150);
      setTimeout(() => {
        this.avatarStandards = true;
        this.avatarAttacco = false;
        this.avatarColpisce = false;
      }, 500);
      setTimeout(() => {
        this.enemyCopito = false;
      }, 200);
      return this.avatarColpisce = true;
    }else{
      return console.log('Si è verificato un problem');
    }
  }
  attackMoveVSDefense(){
    if(this.avatarColpisce == false){
      if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
        this.enemyDefenseGoblin = false;
      }else{
        this.enemyDefense = false;
      }
      this.avatarStandards = false;
      this.avatarAttacco = true;
      setTimeout(() => {
        this.enemyCopito = true;
      }, 150);
      setTimeout(() => {
        this.avatarStandards = true;
        this.avatarAttacco = false;
        this.avatarColpisce = false;
      }, 500);
      setTimeout(() => {
        this.enemyCopito = false;
      }, 200);
      return this.avatarColpisce = true;
    }else{
      return console.log('Si è verificato un problem');
    }
  }
  defenseMove(){
    this.avatarStandards = false;
    this.avatarDefense = true;
    setTimeout(() => {
      this.enemyAttkVSDefense()
      this.enemyNewAction()
    }, 450);
  }

  pgColpito(){
    setTimeout(() => {
      this.avatarColpisce = false;
    }, 100);
    setTimeout(() => {
      this.avatarColpisce = true;
    }, 200);
    setTimeout(() => {
      this.avatarColpisce = false;
    }, 300);
    setTimeout(() => {
      this.avatarColpisce = true;
    }, 400);
  }
  enemyAttkVSDefense(){
    this.enemyAttack = true;
    setTimeout(() => {
      this.enemyAttack = false;
      this.avatarHitDefense = true;
    }, 250);
    setTimeout(() => {
      this.avatarHitDefense = false;
    }, 350);
    setTimeout(() => {
      this.avatarStandards = true;
      this.avatarDefense = false;
    }, 750);
  }

  enemyAttkNoDefense(){
    this.enemyAttack = true;
    setTimeout(() => {
      this.enemyAttack = false;
       this.avatarStandards = false;
      this.avatarDamage = true;
    }, 250);
    // setTimeout(() => {

    // }, 280);
    setTimeout(() => {
      this.avatarStandards = true;
      this.avatarDamage = false;
    }, 700);
  }

  avatarHitNoDefense(){
    this.enemyAttkNoDefense();
  }

//Attacco dell'Avatar
  toBattleAttack(){
    if(this.staminaPoints > 0){
      this.staminaPoints -= 2
      this.toBattleAttack2()
    }else{
      this.iCantDefense = false;
      setTimeout(() => {
        this.iCantDefense = true;
        }, 1500);
    }
  }
  toBattleAttack2(){
    if (this.newEnemyAction == 'ATTACCO' || this.newEnemyAction == 'ATTACCO X2' ){
      this.disableButton = true;
      this.attackMove()
      if(this.newEnemyAction == 'ATTACCO X2'){
        setTimeout(() => {
        this.enemyAttkNoDefense()
        this.avatarTakeDamage()
        }, 1000);
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage()
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
      }else{
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage()
        }, 1000);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 1800);
      }
    }else{
      this.disableButton = true;
      this.attackMoveVSDefense()
          setTimeout(() => {
          this.disableButton = false;
          if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
            this.enemyDefenseGoblin = true;
          }else{
            this.enemyDefense = true;
          }
          this.enemyNewAction()
        }, 1500);
    }
  }

  enemyAttackAfterConcentrazione(){
    if (this.newEnemyAction == 'ATTACCO' || this.newEnemyAction == 'ATTACCO X2' ){
      this.disableButton = true;

      if(this.newEnemyAction == 'ATTACCO X2'){
        setTimeout(() => {
        this.enemyAttkNoDefense()
        this.avatarTakeDamage()
        }, 1000);
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage()
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
      }else if(this.newEnemyAction == 'ATTACCO'){
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage()
        }, 1000);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 1800);
      }
  }}

  toBattleDefense(){
    if (this.staminaPoints > 4 && this.newEnemyAction == 'ATTACCO'){
      this.staminaPoints -= 4;
      this.defenseMove()
    } else if(this.staminaPoints > 4 && this.newEnemyAction == 'ATTACCO X2'){
      if (this.staminaPoints > 4 && this.newEnemyAction == 'ATTACCO X2'){
        this.staminaPoints -= 4;
        this.avatarStandards = false;
        this.avatarDefense = true;
        this.disableButton = true;
        setTimeout(() => {
        this.enemyAttkVSDefense()
        }, 1000);
        setTimeout(() => {
          this.avatarStandards = true;
          this.avatarDefense = false;
        }, 1500);
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage()
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
        }else {
          this.iCantDefenseMe()
        }
    } else if((this.staminaPoints > 4 && this.newEnemyAction == 'DIFESA')){
      if (this.staminaPoints > 4 && this.newEnemyAction == 'DIFESA'){
        this.staminaPoints -= 4;
        this.disableButton = true;
        this.avatarStandards = false;
        this.avatarDefense = true;
        if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
          this.bothDefenseGoblin = false;
        }else{
          this.bothDefense = false;
        }
        setTimeout(() => {
        this.disableButton = false;
        this.avatarStandards = true;
        this.avatarDefense = false;
        if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
          this.bothDefenseGoblin = true;
        }else{
          this.bothDefense = true;
        }
        this.enemyNewAction()
        }, 1500);
      }else {
        this.iCantDefenseMe()
      }
    } else{
      this.iCantDefenseMe()
    }
  }

  concentrazione(){
    this.staminaPoints += 4;
    this.disableButton = true;
    if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
      this.versusConcencGoblin = false;
    }else{
      this.versusConcentrazione = false;
    }

    if(this.newEnemyAction == 'DIFESA'){
      setTimeout(() => {
        this.disableButton = false;
        if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
          this.versusConcencGoblin = true;
        }else{
          this.versusConcentrazione = true;
        }
        this.enemyNewAction()
      }, 2000);
    }else{
      setTimeout(() => {
        if (this.enemyGoblinStandard == true || this.enemyGoblinSkirmisher == true) {
          this.versusConcencGoblin = true;
        }else{
          this.versusConcentrazione = true;
        }
        }, 1900);
      this.enemyAttackAfterConcentrazione()

    }
  }

  iCantDefenseMe(){
    this.iCantDefense = false;
    setTimeout(() => {
    this.iCantDefense = true;
    }, 1500);
  }
  // 'ATTACCO', 'DIFESA', 'PENSO', 'ATTACCO X2', 'MI CURO', 'ATTACCO'

//METODI DELLE CAMPAGNA
  enemyChooseGoblin(){
    this.chooseCamaign()
    if (this.enemyGoblinStandard == false) {
      return this.enemyGoblinStandard = true;
    }else{
      this.enemyGoblinStandard = false;
      return this.enemyGoblinSkirmisher = true;
    }
  }

  enemyChooseMiniBoss(){
    this.chooseCamaign()
    if (this.enemyMiniBoss == false) {
      return this.enemyMiniBoss = true;
    }else{
      return this.enemyMiniBoss = false;
    }
  }

  svuotaBattleground(): void {
    if (this.enemyGoblinStandard) {
      this.enemyGoblinStandard = false;
    } else if (this.enemyGoblinSkirmisher) {
      this.enemyGoblinSkirmisher = false;
    } else if (this.enemyMiniBoss) {
      this.enemyMiniBoss = false;
    }
  }

  loseScreen : boolean = false;
  avatarMaxLife :number = 10;
  enemyMaxLife :number = 10;

  avatarBattleLife! :number;
  enemyBattleLife! :number;

  avatarLifeArray : string[] = [];
  enemyLifeArray : string[] = [];

  cuoreIntero = "../../../../assets/cuoreIntero.png";
  cuoreFerito = "../../../../assets/cuoreFerito.png";
  cuoreVuoto = "../../../../assets/cuoreVuoto.png";

  lifeMetod(){
    this.avatarLifeArray.splice(0, this.avatarLifeArray.length);
    let cuoriMancantiAvatar = (this.avatarMaxLife - this.avatarBattleLife);

    if (this.avatarBattleLife != 0) {
      for (let index = 0; index < this.avatarBattleLife; index++) {
        this.avatarLifeArray.push(this.cuoreIntero);
      }
      for (let index = 0; index < cuoriMancantiAvatar; index++) {
        this.avatarLifeArray.push(this.cuoreVuoto);
      }
    }else{
      for (let index = 0; index < cuoriMancantiAvatar; index++) {
        this.avatarLifeArray.push(this.cuoreVuoto);
      }
      this.avatarLose()
    }

  }
  avatarTakeDamage(){
    this.avatarBattleLife -= 1;
    this.lifeMetod();
  }
  setLifeAvatar(){
    this.avatarBattleLife = this.avatarMaxLife;
  }
  avatarLose(){
    setTimeout(() => {
      this.loseScreen = true;
    }, 2000);
  }














}
