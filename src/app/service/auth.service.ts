import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  isAuthenticate() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((res: any) => {
        if (res.user?.uid) {
          this.router.navigate(['/form']);
          localStorage.setItem('token', JSON.stringify(res.user.uid));
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
  logout() {
    return signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate([''])
      })
      .catch(err => {
        console.log('signout error');
        alert(err.message)
      })
  }
}
