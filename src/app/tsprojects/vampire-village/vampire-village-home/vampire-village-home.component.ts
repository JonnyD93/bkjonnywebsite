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

  database: any;
  userData: { level: number, experience: number, inventory: any[], characters: Entity[]};

  constructor(private fakeDataService: FakeDataService, private accountService: AccountService) {
    this.database = firebase.database();
    this.database.ref('vampire-village').once('value').then((snapshot) => {
    for (var key in snapshot.val()) {
    }
  });
  console.log(accountService.user);
  accountService.checkSignedIn();
  console.log(accountService.user);
  }

  ngOnInit() {
  }

}
