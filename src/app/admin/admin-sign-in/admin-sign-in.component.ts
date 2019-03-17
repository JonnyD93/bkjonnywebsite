import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AdminService} from "../admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
  }
  submit(){
    if(this.email != undefined && this.password != undefined) {
      this.adminService.signUp(this.email,this.password,()=>this.router.navigate(['vampire-village/home']),
        (error)=>{
          this.error = error.message;
        });
    }
  }
}
