import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {Player} from "./models/player.model";

@Injectable()
export class AccountService {

  user: any;
  account: Player;
  private loggedIn: boolean;
  database: any;

  constructor(private router: Router) {
    this.database = firebase.database();
    this.loggedIn = false;
  }

  checkSignedIn(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
        this.user = {email: user.email, id: user.uid};
        Object.keys(this.account).forEach(key=>{
          this.database.ref('/vampire-village/users').find(this.user.id)
        })
      } else
        this.loggedIn = false;
    });
    return (this.loggedIn) ?  null : this.router.navigate(['vampire-village/login']);
  }

  signIn(email,password,onFinish,onError){
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(()=>onFinish())
      .catch((error)=> onError(error));
  }
  signOut(){
    firebase.auth().signOut();
  }

  createAccount(email, password, onFinish, onError){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() =>
      this.signIn(email,password,
        () => onFinish(),
        (error) => this.router.navigate(['vampire-village/login']))
    )
      .catch( (error)=> onError(error));
  }
}
