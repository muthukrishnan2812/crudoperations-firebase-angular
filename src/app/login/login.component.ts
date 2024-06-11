import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  myFrom: FormGroup
  private adminMail = ["rmkrishnan2812@gmail.com", "muthu@mk.com"]
  constructor(private auth: AuthService, private router: Router) {
    this.myFrom = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  isAuthenticate() {
    this.auth.isAuthenticate()
      .then((res: any) => {
        if (res.user?.uid) {
          const email = res.user.email;
          const role = this.adminMail.includes(email) ? 'Admin' : 'User';
          console.log(role);
          localStorage.setItem('token', JSON.stringify(res.user.uid));
          localStorage.setItem('role', role)
          if (role == 'Admin') {
            this.router.navigate(['/form'])
          }
          else if (role == 'User') {
            this.router.navigate(['/user'])
          }
        }
        else {
          throw new Error('user Id not found');
        }
      })
      .catch(err => {
        this.router.navigate([''])
        alert(err.message);
      });
  }
  loginUser() {
    const email = this.myFrom.get('email')?.value;
    const password = this.myFrom.get('password')?.value;
    this.auth.loginUser(email, password)
      .then((res: any) => {
        if (res.user?.uid) {
          const role = this.adminMail.includes(email) ? 'Admin' : 'User';
          localStorage.setItem('token', JSON.stringify(res.user.uid))
          localStorage.setItem('role', role)
          if (role === 'Admin') {
            this.router.navigate(['/form'])
          }
          else if (role === 'User') {
            this.router.navigate(['/user'])
          }
          else {
            throw new Error('user email not found')
          }
        }
      })
  }
}
