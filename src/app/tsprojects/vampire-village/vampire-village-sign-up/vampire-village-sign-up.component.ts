import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-vampire-village-sign-up',
  templateUrl: './vampire-village-sign-up.component.html',
  styleUrls: ['./vampire-village-sign-up.component.css']
})
export class VampireVillageSignUpComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  constructor(private accountService: AccountService,private router: Router) {
    this.error = '';
 }

  ngOnInit() {
  }

  checkPasswordsIdentical(){
    if (this.password === this.confirmPassword )
      return true;
    else {
      this.error = 'Passwords do not match';
      this.resetPasswords();
    }
    return false;
  }

  resetPasswords(){
    this.password = '';
    this.confirmPassword = '';
  }
  submit(){
    if(this.email != undefined && this.password != undefined && this.checkPasswordsIdentical()) {
      this.accountService.createAccount(this.email,this.password,()=>this.router.navigate(['vampire-village/home']),
        (error)=>{
        this.error = error.message;
        this.resetPasswords();
      });
    }
  }
}
