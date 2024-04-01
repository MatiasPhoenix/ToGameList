import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../SezioneAuth/AuthUser/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirebaseService } from '../../../SezioneAuth/Firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private authservice : AuthService,
    private http        : HttpClient,
    private firebase    : FirebaseService,
    ){}

  userForm!               : FormGroup;
  dataAvatar!             : string;
  urlAvatar               : string = `https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/profiloAvatar`;
  urlIdentificativo       : string = `https://togamelist-e79bb-default-rtdb.europe-west1.firebasedatabase.app/codiceIdentificativo`;

  ngOnInit() {
    this.userForm = new FormGroup({
      email       : new FormControl(null, [Validators.required, Validators.email]),
      password    : new FormControl()
    });
  }

  onSubmit(form : any) {
    // const user = form.value.nome
    const email = form.value.email
    const password = form.value.password
    this.authservice.signUp(email, password)
    .subscribe(data => {
      console.log(data);
    })

  }


  codiceIdentificativo(){
    this.firebase.creaCodiceIdentificativo(
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

}
