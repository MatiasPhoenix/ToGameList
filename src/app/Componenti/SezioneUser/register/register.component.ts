import { AuthService } from './../../../SezioneAuth/AuthUser/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authservice: AuthService){}
  userForm!: FormGroup;

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
}
