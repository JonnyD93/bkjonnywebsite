import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vampire-village-login',
  templateUrl: './vampire-village-login.component.html',
  styleUrls: ['./vampire-village-login.component.css']
})
export class VampireVillageLoginComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(private accountService: AccountService, private router: Router) {
    this.error = '';
  }

  ngOnInit() {
  }

  signIn(){
    if(this.email != undefined && this.password != undefined)
      this.accountService.signIn(this.email,this.password,()=>this.router.navigate(['vampire-village/home']),
      (error)=>{
      this.error = error.message;
      this.password = '';
      });
  }

}
