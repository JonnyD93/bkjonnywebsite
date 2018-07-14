import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {FakeDataService} from "../services/fakeData.service";
import {Entity} from "../services/models/entity.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-vampire-village-home',
  templateUrl: './vampire-village-home.component.html',
  styleUrls: ['./vampire-village-home.component.css']
})

export class VampireVillageHomeComponent implements OnInit {

  displayData: any;

  constructor(private accountService: AccountService) {
    accountService.checkSignedIn();
    this.displayData = accountService.account;
    console.log(accountService.adminCalculateAllRanks());
  }

  ngOnInit() {
  }

  logOut(){
    this.accountService.signOut();
    this.accountService.checkSignedIn();
  }
}
