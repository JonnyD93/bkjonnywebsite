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
        this.user = {email: user.email, id: user.uid};
        this.database.ref('/vampire-village/users').once('value').then((snapshot)=>{
          if(snapshot.val() != null && snapshot.val().accountId === this.user.id)
            this.account = snapshot.val();
            });
        this.loggedIn = true;
      } else
        this.loggedIn = false;
    });
    console.log(this.account);
    if (this.loggedIn) {
      if (this.account === undefined)
        this.router.navigate(['vampire-village/create-character']);
      else
        this.router.navigate(['vampire-village/home']);
    } else
      this.router.navigate(['vampire-village/login']);
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
      {this.signIn(email,password,
        () => onFinish(),
        (error) => this.router.navigate(['vampire-village/login']));}
    )
      .catch( (error)=> onError(error));
  }
}
