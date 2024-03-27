import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../SezioneAuth/AuthUser/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(
    private router        : Router,
    private authservice   : AuthService,
    ){}
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
    this.authservice.signIn(email, password)
    .subscribe((data: any) => {
      console.log(data);

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
      this.authservice.createUser(data.email, data.localId, data.idToken, expirationDate)
      localStorage.setItem('user', JSON.stringify(this.authservice.user))

      console.log(this.authservice.user);
      this.router.navigate(['']);
    })

  }
}
