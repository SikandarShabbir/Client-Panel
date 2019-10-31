import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from '../guards/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    
  ) { }
  login(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), err=> reject(err))
    });
  }
  register(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), err=> reject(err))
    });
  }
  getAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth));
  }
  logout(){
    return this.afAuth.auth.signOut();
  }
}
