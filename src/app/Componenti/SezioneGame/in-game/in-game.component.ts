
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { log } from 'console';
import { timeout } from 'rxjs';
import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';
import { AuthService } from '../../../SezioneAuth/AuthUser/auth.service';


@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.scss'
})

export class InGameComponent implements OnInit  {
  constructor(
    private http        : HttpClient,
    private firebase    : FirebaseService,
    private authService : AuthService,
    ){}



  codiceIdentificativo!   : string;
  urlAvatar               : string = `https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/profiloAvatar`;
  urlIdentificativo       : string = `https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/codiceIdentificativo`;

//STATISTICHE AVATAR

  profileAvatarLevel!     : number;
  profileAvatarExp!       : number;

  profileAvatarStrength!  : number;
  profileAvatarArmor!     : number;
  profileAvatarSpeed!     : number;

  profileAvatarGold!      : number;
  profileAvatarLife       : number = 3;
  profileAvatarStamina    : number = 3;

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
  imgEnemyAttack          : string[] = ['../../../../sword/.png', '../../../../swordX2/.png', '../../../../shield/.png'];

//Gestione sezioni
  disableButton           : boolean = false;
  isVisible               : boolean = true;
  battleGround            : boolean = true
  charAndScenario         : boolean = true;
  menuCampaign            : boolean = false;
  toGameListTutorials     : boolean = false;
  tutorialAvatar          : boolean = false;
/////////////
/////////////
/////////////
//MODIFICARE BATTLEGROUND E MINIBOSS
/////////////
/////////////
/////////////

  ngOnInit(){

    this.caricaProfiloAvatar()
    this.enemyNewAction()
    setTimeout(() => {

      this.setLifeAvatar()
    }, 100);
    setTimeout(() => {
      this.staminaMetod()
      this.lifeMetod()

    }, 200);
  }

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//SEZIONE DI COLLEGAMENTO CON DATABASE

creazioneProfilo(){
  this.firebase.creaProfiloAvatar(
    this.urlAvatar + '.json',
    {
      profileAvatarLevel     : 1,
      profileAvatarExp       : 0,

      profileAvatarStrength  : 1,
      profileAvatarArmor     : 0,
      profileAvatarSpeed     : 0,

      profileAvatarGold      : 0,
      profileAvatarLife      : 3,
      profileAvatarStamina   : 3,
    })
    .subscribe(data => {

      console.log(data);
    })
}


caricaProfiloAvatar() {

  this.firebase.caricaProfiloAvatar(this.urlAvatar + '.json')
    .subscribe(
      (data: any) => {
        const profileKey = Object.keys(data)[0];
        const dataProfiloAvatar = data[profileKey];


        this.profileAvatarLevel     = dataProfiloAvatar.profileAvatarLevel;
        this.profileAvatarExp       = dataProfiloAvatar.profileAvatarExp;
        this.profileAvatarStrength  = dataProfiloAvatar.profileAvatarStrength;
        this.profileAvatarArmor     = dataProfiloAvatar.profileAvatarArmor;
        this.profileAvatarSpeed     = dataProfiloAvatar.profileAvatarSpeed;
        this.profileAvatarGold      = dataProfiloAvatar.profileAvatarGold;
        this.profileAvatarLife      = dataProfiloAvatar.profileAvatarLife;
        this.profileAvatarStamina   = dataProfiloAvatar.profileAvatarStamina;
      },
      (error) => {
        console.error('Errore nel caricare il profilo avatar:', error);
      }
    );
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
  enemyNewAction() { //Calcola random della mossa successiva del nemico
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
        this.enemyTakeDamage(1)
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
      if(this.staminaBattleAvatar > 0){
          this.useStaminaAvatar(1);
          this.toBattleAttack2();
          }else{
            this.iCantDefense = false;
            setTimeout(() => {
              this.iCantDefense = true;
              }, 1500);
          }
    } else if(this.enemyBattleLife == 1 && this.newEnemyAction != 'DIFESA'){
      this.attackMove()
      this.enemyTakeDamage(1)
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
        this.avatarTakeDamage(1)
        }, 1000);
        setTimeout(() => {
          if(this.avatarBattleLife != 0){

            this.enemyAttkNoDefense()
            this.avatarTakeDamage(1)
          }else{
            this.avatarLose()
          }
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
      }else{
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage(1)
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
        this.avatarTakeDamage(1)
        }, 1000);
        setTimeout(() => {
          if (this.avatarBattleLife != 0) {
            this.enemyAttkNoDefense()
            this.avatarTakeDamage(1)
          }else{
            this.avatarLose()
          }
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
      }else if(this.newEnemyAction == 'ATTACCO'){
        setTimeout(() => {
          this.enemyAttkNoDefense()
          this.avatarTakeDamage(1)
        }, 1000);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 1800);
      }
  }}

  toBattleDefense(){
    if (this.staminaBattleAvatar >= 2 && this.newEnemyAction == 'ATTACCO'){
      this.useStaminaAvatar(2);
      this.defenseMove()
    } else if(this.staminaBattleAvatar >= 2 && this.newEnemyAction == 'ATTACCO X2'){
      if (this.staminaBattleAvatar >= 2 && this.newEnemyAction == 'ATTACCO X2'){
        this.useStaminaAvatar(2);
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
          this.avatarTakeDamage(1)
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
        }else {
          this.iCantDefenseMe()
        }
    } else if((this.staminaBattleAvatar >= 2 && this.newEnemyAction == 'DIFESA')){
      if (this.staminaBattleAvatar >= 2 && this.newEnemyAction == 'DIFESA'){
        this.useStaminaAvatar(2);
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
  swordAndShield(){//Attacca e difende con lo scudo
    if(this.enemyBattleLife != 1 && this.newEnemyAction != 'DIFESA'){
      if (this.staminaBattleAvatar >= 3 && this.newEnemyAction == 'ATTACCO X2'){
        this.useStaminaAvatar(3);
        this.attackMove();
        setTimeout(() => {
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
          this.avatarTakeDamage(1)
        }, 1800);
        setTimeout(() => {
          this.disableButton = false;
          this.enemyNewAction()
        }, 2800);
        }, 1000);
      }else if(this.staminaBattleAvatar >= 3 && this.newEnemyAction == 'ATTACCO'){
        this.useStaminaAvatar(3);
        this.attackMove();
        setTimeout(() => {
        this.avatarStandards = false;
        this.avatarDefense = true;
        this.disableButton = true;
        setTimeout(() => {
        this.enemyAttkVSDefense()
        }, 1000);
        setTimeout(() => {
          this.avatarStandards = true;
          this.avatarDefense = false;
          this.disableButton = false;
          this.enemyNewAction()
        }, 1500);
        }, 1000);
      }else{
        this.iCantDefenseMe()
      }

    }else if(this.enemyBattleLife == 1 && this.newEnemyAction != 'DIFESA'){
      if (this.staminaBattleAvatar >= 3) {
        this.useStaminaAvatar(3);
        this.attackMove();
        setTimeout(() => {
        this.avatarStandards = false;
        this.avatarDefense = true;
        this.disableButton = true;
        this.avatarWin();
        setTimeout(() => {
          this.avatarStandards = true;
          this.avatarDefense = false;
          this.disableButton = false;
          this.enemyNewAction()
        }, 1200);
        }, 1000);
      }else{
        this.iCantDefenseMe()
      }
      }
  }

  concentrazione(){
    this.chargeStaminaAvatar(3);
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
    this.enemyMaxLife = 2;
    this.enemyBattleLife = 2;
    this.lifeMetodEnemy()

      this.chooseCamaign()

      this.enemyGoblinSkirmisher = true
      this.provokeGoblin = false;
      setTimeout(() => {
        this.provokeGoblin = true;
      }, 1000);

  }
  goblinChange(){
      this.enemyMaxLife = 4;
      this.enemyBattleLife = 4;
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
    this.enemyMaxLife = 6;
    this.enemyBattleLife = 6;
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
    this.battleGround = true
  }


//SEZIONE PER IL CALCOLO DEI DANNI E LA PRESENTAZIONE A SCHERMO
  loseScreen          : boolean = false;
  victoryScreen       : boolean = false;


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
    let cuoriMancantiAvatar = (this.profileAvatarLife - this.avatarBattleLife);

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
  avatarTakeDamage(numero : number){
    this.avatarBattleLife -= numero;
    this.lifeMetod();
    if(this.avatarBattleLife === 0){
      this.avatarLose();
    }
  }
  setLifeAvatar(){
    this.staminaBattleAvatar = this.profileAvatarStamina;
    this.avatarBattleLife = this.profileAvatarLife;
  }
  avatarLose(){
    setTimeout(() => {
      this.toBattle();
      this.svuotaBattleground();
      this.loseScreen = true;
      this.enemyGoblinSkirmisher = false;
      this.enemyGoblinStandard = false;
      this.enemyMiniBoss = false;
      this.isTransparent = false;
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
      this.bothEnemyGoblins = false;
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
  enemyTakeDamage(numero : number){
    this.enemyBattleLife -= numero;
    this.lifeMetodEnemy();
  }

  characterDead(){
    if (!this.isTransparent) {
      this.isTransparent = true;
    }else{
      this.isTransparent = false;
    }

  }



  staminaBattleAvatar!  : number;
  avatarStaminaArray   : string[] = [];

  batteryFull          = "../../../../assets/BatteriaPiena.png";
  batteryEmpty         = "../../../../assets/BatteriaVuota.png";


  staminaMetod(){
    this.avatarStaminaArray.splice(0, this.avatarStaminaArray.length);
    let staminaMancanteAvatar = (this.profileAvatarStamina - this.staminaBattleAvatar);

    if (this.staminaBattleAvatar != 0) {
      for (let index = 0; index < this.staminaBattleAvatar; index++) {
        this.avatarStaminaArray.push(this.batteryFull);
      }
      for (let index = 0; index < staminaMancanteAvatar; index++) {
        this.avatarStaminaArray.push(this.batteryEmpty);
      }
    }else{
      for (let index = 0; index < staminaMancanteAvatar; index++) {
        this.avatarStaminaArray.push(this.batteryEmpty);
      }
    }
  }
  useStaminaAvatar(staminaCostAvatar : number){
    this.staminaBattleAvatar -= staminaCostAvatar;
    this.staminaMetod()
  }
  chargeStaminaAvatar(staminaCostAvatar : number){
    this.staminaBattleAvatar += staminaCostAvatar;
    if(this.staminaBattleAvatar >= this.profileAvatarStamina){
      this.staminaBattleAvatar = this.profileAvatarStamina;
    }
    this.staminaMetod()
  }

  inventario   : boolean = false;

  potionH1     : boolean = true;
  potionH2     : boolean = true;
  potionH3     : boolean = true;

  potionS1     : boolean = true;
  potionS2     : boolean = true;
  potionS3     : boolean = true;

  useObject(){//Permette l'uso di oggetti(mossa gratuita)
    if (this.inventario == false) {
      this.inventario = true;
    }else{
      this.inventario = false;
    }
  }
  usePotion(potion : boolean, tipo : string){
    if (potion == true && tipo === 'H') {
      if (this.avatarBattleLife != this.profileAvatarLife) {
        this.avatarBattleLife +=1;
        this.lifeMetod();
      }
    }
    if (potion == true && tipo === 'S') {
      if (this.staminaBattleAvatar != this.profileAvatarStamina){
        this.staminaBattleAvatar += 1;
        this.staminaMetod()
      }

    }
  }
  secretSkill(){//Attacco speciale(molti danni)
    this.avatarStandards = false;
    this.avatarSkillStart = true;
    setTimeout(() => {
      this.avatarSkillStart = false;
      this.avatarSkillAtk = true;
      this.enemyTakeDamage(4)
      this.bankaiExplosion()
    }, 600);
    setTimeout(() => {
      this.avatarSkillAtk = false;
      this.avatarStandards = true

    }, 1200);
  }

  gifExplosion : boolean = false;

  bankaiExplosion(){
    if(this.enemyGoblinStandard){
      this.gifExplosion = true;
      this.enemyGoblinStandard = false;
      setTimeout(() => {
        this.gifExplosion = false;
        if(this.enemyBattleLife <= 0){
          this.avatarWin()
        }
        this.enemyGoblinStandard = true;
      }, 500);
    }else if(this.enemyGoblinSkirmisher){
      this.gifExplosion = true;
      this.enemyGoblinSkirmisher = false;
      setTimeout(() => {
        this.gifExplosion = false;
        if(this.enemyBattleLife <= 0){
          this.avatarWin()
        }
        this.enemyGoblinSkirmisher = true;
      }, 500);
    }else if(this.enemyMiniBoss){
      this.gifExplosion = true;
      this.enemyMiniBoss = false;
      setTimeout(() => {
        this.gifExplosion = false;
        if(this.enemyBattleLife <= 0){
          this.avatarWin()
        }
        this.enemyMiniBoss = true;
      }, 500);
    }
  }

  superAura1 : boolean = false;
  superAuraBankai : boolean = false;

  superAuraBankaiMetod(){
    setTimeout(() => {
    }, 100);
    setTimeout(() => {
      this.superAuraBankai = true
    }, 150);
    setTimeout(() => {
      this.superAuraBankai = false;
    }, 200);
    setTimeout(() => {
      this.superAuraBankai = true
    }, 250);
    setTimeout(() => {
      this.superAuraBankai = false;
    }, 300);
    setTimeout(() => {
      this.superAuraBankai = true
    }, 350);
    setTimeout(() => {
      this.superAuraBankai = false;
    }, 400);
    setTimeout(() => {
      this.superAuraBankai = true
    }, 450);
    setTimeout(() => {
      this.superAuraBankai = false;
    }, 500);
    setTimeout(() => {
      this.superAuraBankai = true
    }, 550);
  }
  superAura(){
    setTimeout(() => {
      this.superAura1 = true;
    }, 100);
    setTimeout(() => {
      this.superAura1 = false;

    }, 150);
    setTimeout(() => {
      this.superAura1 = true

    }, 200);
    setTimeout(() => {
      this.superAura1 = false;

    }, 250);
    setTimeout(() => {
      this.superAura1 = true

    }, 300);
    setTimeout(() => {
      this.superAura1 = false;

    }, 350);
    setTimeout(() => {
      this.superAura1 = true

    }, 400);
    setTimeout(() => {
      this.superAura1 = false;

    }, 450);
    setTimeout(() => {
      this.superAura1 = true

    }, 500);
    setTimeout(() => {
      this.superAura1 = false;

    }, 550);
  }


}
