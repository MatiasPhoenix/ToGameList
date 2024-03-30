
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
  enemyColpito            : boolean = false;
  enemyAttack             : boolean = false;
  enemyMistery            : boolean = true;
  enemyGoblinStandard     : boolean = false;
  enemyGoblinSkirmisher   : boolean = false;
  bothEnemyGoblins        : boolean = false;
  enemyMiniBoss           : boolean = false;
  iCantDefense            : boolean = true;
  avatarHitDefense        : boolean = false;
  isTransparent           : boolean = false;

//In battaglia "dialoghi"
  enemyDefenseGoblin      : boolean = true;
  bothDefenseGoblin       : boolean = true;
  versusConcencGoblin     : boolean = true;
  enemyDefense            : boolean = true;
  bothDefense             : boolean = true;
  versusConcentrazione    : boolean = true;
  provokeBoss             : boolean = true;
  provokeGoblin           : boolean = true;

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
  battleGround            : boolean = true;
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

  enemyNewAction() { //Calcola la mossa successiva del nemico
    const indiceCasuale: number = Math.floor(Math.random()
    * this.enemyActions.length);
    return this.newEnemyAction = this.enemyActions[indiceCasuale];
  }

  chooseCamaign(){ //Button Adventure Time! avvia metodi per l'avventura
    if (this.menuCampaign == false) {
      return this.menuCampaign = true;
    }else {
      this.toBattle();
      return this.menuCampaign = false;
    }
  }
  annullaCamaign(){ //Button Annulla Campagna, disattiva chooseCampaign senza intralciare
    if (this.menuCampaign == false) {
      return this.menuCampaign = true;
    }else {
    return this.menuCampaign = false;
    }
  }

  toBattle(){ //Fa comparire il campo di battaglia
    if(this.battleGround == false){
      this.pgToBattle()
      return this.battleGround = true;
    }else{
      this.pgToBattle()
      return this.battleGround = false;
    }
  }

  pgToBattle(){ //Permette la comparsa di scenario campagna, stanza buia e avatar sul campo
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
        this.enemyColpito = true;
        this.enemyTakeDamage()
      }, 150);
      setTimeout(() => {
        this.avatarStandards = true;
        this.avatarAttacco = false;
        this.avatarColpisce = false;
      }, 500);
      setTimeout(() => {
        this.enemyColpito = false;
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
        this.enemyColpito = true;
      }, 150);
      setTimeout(() => {
        this.avatarStandards = true;
        this.avatarAttacco = false;
        this.avatarColpisce = false;
      }, 500);
      setTimeout(() => {
        this.enemyColpito = false;
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
    if(this.enemyBattleLife > 1){
      if(this.staminaPoints > 0){
            this.staminaPoints -= 2
            this.toBattleAttack2()
          }else{
            this.iCantDefense = false;
            setTimeout(() => {
              this.iCantDefense = true;
              }, 1500);
          }
    } else if(this.enemyBattleLife == 1 && this.newEnemyAction != 'DIFESA'){
      this.attackMove()
      this.enemyTakeDamage()
      this.avatarWin();
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
    this.enemyMaxLife = 1;
    this.enemyBattleLife = 1;
    this.lifeMetodEnemy()

      this.chooseCamaign()

      this.enemyGoblinSkirmisher = true
      this.provokeGoblin = false;
      setTimeout(() => {
        this.provokeGoblin = true;
      }, 1000);

  }
  goblinChange(){
      this.enemyMaxLife = 1;
      this.enemyBattleLife = 1;
      this.lifeMetodEnemy()
      this.enemyGoblinSkirmisher = false;
      this.enemyGoblinStandard = true;
      this.isTransparent = false;
      this.provokeGoblin = false;
      setTimeout(() => {
        this.bothEnemyGoblins = true;
        this.provokeGoblin = true;
      }, 1000);
  }

  enemyChooseMiniBoss(){
    this.enemyMaxLife = 2;
    this.enemyBattleLife = 2;
    this.lifeMetodEnemy()
    this.chooseCamaign()

    this.enemyMiniBoss = true;

    setTimeout(() => {
      this.provokeBoss = false;
    }, 500);
    setTimeout(() => {
      this.provokeBoss = true;
    }, 2500);
  }

  svuotaBattleground(): void {
    this.enemyGoblinStandard = false;
    this.enemyGoblinSkirmisher = false;
    this.enemyMiniBoss = false;
  }


//SEZIONE PER IL CALCOLO DEI DANNI E LA PRESENTAZIONE A SCHERMO
  loseScreen          : boolean = false;
  victoryScreen       : boolean = false;

  avatarMaxLife       :number = 10;
  enemyMaxLife!       :number;

  avatarBattleLife!   :number;
  enemyBattleLife!    :number;

  avatarLifeArray     : string[] = [];
  enemyLifeArray      : string[] = [];

  cuoreVuoto          = "../../../../assets/cuoreVuoto.png";
  cuoreFerito         = "../../../../assets/cuoreFerito.png";
  cuoreIntero         = "../../../../assets/cuoreIntero.png";

  //CALCOLO DANNI AVATAR
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
        this.avatarLose()
      }
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

  avatarWin() {
    this.characterDead();
    setTimeout(() => {
    if (this.bothEnemyGoblins) {
      this.totalVictory();
    }

    if (this.enemyMiniBoss) {
      this.enemyMiniBoss = false;
      this.totalVictory();
    }

    if(this.enemyGoblinSkirmisher) {
      this.goblinChange()
    }
    }, 2000);
  }
  totalVictory(){
    setTimeout(() => {
      this.toBattle();
      this.svuotaBattleground();
      this.victoryScreen = true;
      this.isTransparent = false;
    }, 1000);
  }


   //CALCOLO DANNI NEMICO
   lifeMetodEnemy(){
    this.enemyLifeArray.splice(0, this.enemyLifeArray.length);
    let cuoriMancantiEnemy = (this.enemyMaxLife - this.enemyBattleLife);

    if (this.enemyBattleLife > 0) {
      for (let index = 0; index < this.enemyBattleLife; index++) {
        this.enemyLifeArray.push(this.cuoreIntero);
      }
      for (let index = 0; index < cuoriMancantiEnemy; index++) {
        this.enemyLifeArray.push(this.cuoreVuoto);
      }
    }else{
      for (let index = 0; index < this.enemyMaxLife; index++) {
        this.enemyLifeArray.push(this.cuoreVuoto);
        this.avatarWin()
      }
    }
  }
  enemyTakeDamage(){
    this.enemyBattleLife -= 1;
    this.lifeMetodEnemy();
  }
  setLifeEnemy(){
    this.avatarBattleLife = this.avatarMaxLife;
  }




  characterDead(){
    if (!this.isTransparent) {
      this.isTransparent = true;
    }else{
      this.isTransparent = false;
    }

  }








}
