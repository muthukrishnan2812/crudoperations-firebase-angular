import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private adminMail = "rmkrishnan2812@gmail.com"
  constructor(private auth: AuthService,private router:Router) { }
  isAuthenticate() {
    this.auth.isAuthenticate()
    .then((res: any) => {
      if (res.user?.uid) {
        const email = res.user.email;
        const role = (email === this.adminMail) ? 'Admin' : 'User';
        console.log(role);
        localStorage.setItem('token', JSON.stringify(res.user.uid));
        localStorage.setItem('role', role)
        if (role=='Admin') {
        this.router.navigate(['/form'])
        }
        else if (role =='User') {
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
}
