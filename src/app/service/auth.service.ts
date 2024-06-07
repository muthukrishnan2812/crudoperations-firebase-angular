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
  }
  logout() {
    return signOut(this.auth)
  }
}
