import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {FakeDataService} from "../services/fakeData.service";

@Component({
  selector: 'app-vampire-village-home',
  templateUrl: './vampire-village-home.component.html',
  styleUrls: ['./vampire-village-home.component.css']
})
export class VampireVillageHomeComponent implements OnInit {

  database: any;
  userData: { level: number, experience: number, inventory: any[], characters: any[]};

  constructor(private fakeDataService: FakeDataService) {
    this.database = firebase.database();
    this.database.ref('vampire-village').once('value').then((snapshot) => {
    for (var key in snapshot.val()) {
    }
  });}

  ngOnInit() {
  }

}
