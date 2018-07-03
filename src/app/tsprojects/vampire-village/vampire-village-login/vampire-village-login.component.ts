import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vampire-village-login',
  templateUrl: './vampire-village-login.component.html',
  styleUrls: ['./vampire-village-login.component.css']
})
export class VampireVillageLoginComponent implements OnInit, AfterViewInit {

  email: string;
  password: string;
  error: string;

  constructor(private accountService: AccountService) {
    this.error = '';

  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.accountService.checkSignedIn();
  }

  signIn(){
    this.accountService.checkSignedIn();
    if(this.email != undefined && this.password != undefined)
      this.accountService.signIn(this.email,this.password,function(),
      (error)=>{
      this.error = error.message;
      this.password = '';
      });
  }

}
