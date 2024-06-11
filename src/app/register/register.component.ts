import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  myForm : FormGroup
 constructor(private authService:AuthService, private router:Router){
  this.myForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })
 }
  onRegister(){
    const email = this.myForm.get('email')?.value
    const password = this.myForm.get('password')?.value
    this.authService.registerUser(email,password)
    .then(()=>{
      alert('user register successfully')
      this.router.navigate(['']);
    })
  }
}
