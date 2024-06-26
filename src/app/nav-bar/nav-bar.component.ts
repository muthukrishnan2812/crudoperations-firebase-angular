import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private auth: AuthService, private router: Router) { }
  logout() {
    return this.auth.logout()
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate([''])
    })
    .catch(err => {
      console.log('signout error');
      alert(err.message)
    })
  }
}
