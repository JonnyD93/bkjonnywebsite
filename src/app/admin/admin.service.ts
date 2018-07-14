import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import * as firebase from "firebase";

@Injectable()
export class AdminService {

  user: any;
  private loggedIn: boolean;
  database: any;

  constructor(private router: Router) {
    this.database = firebase.database();
    this.loggedIn = false;
  }
  checkSignedIn(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = {email: user.email, id: user.uid};
        this.loggedIn = true;
      } else
        this.loggedIn = false;
    });
  }

  signIn(email,password,onFinish,onError){
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(()=>onFinish())
      .catch((error)=> onError(error));
  }

  signUp(email, password, onFinish, onError){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() =>
        {this.signIn(email,password,
          () => onFinish(),
          (error) => this.router.navigate(['vampire-village/login']));}
      )
      .catch( (error)=> onError(error));
  }
  signOut(){
    firebase.auth().signOut();
  }
}
