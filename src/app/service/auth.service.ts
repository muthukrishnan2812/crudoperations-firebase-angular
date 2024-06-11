import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, EmailAuthProvider, signInWithPhoneNumber, PhoneAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword,RecaptchaVerifier } from '@angular/fire/auth';
import { firebaseApp$ } from '@angular/fire/app';
import firebase from 'firebase/app'
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
  registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
}
