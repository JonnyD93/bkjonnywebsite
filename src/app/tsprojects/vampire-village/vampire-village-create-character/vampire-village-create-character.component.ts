import { Component, OnInit } from '@angular/core';
import {Entity} from "../services/models/entity.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-vampire-village-create-character',
  templateUrl: './vampire-village-create-character.component.html',
  styleUrls: ['./vampire-village-create-character.component.css']
})
export class VampireVillageCreateCharacterComponent implements OnInit {

  character : Entity;
  characterDisplayed: any = {name: '', health: 0, attack: 0, accuracy: 0, agility: 0, resistance: 0};
  displayKeys: any[] = [];
  constructor(private accountService: AccountService) {
    // Character name, side, health, attack, defence, accuracy, agility, resistance, abilities
    this.accountService.checkSignedIn();
    Object.keys(this.characterDisplayed).forEach((key)=>{this.displayKeys.push(key)});
    this.character = new Entity('','human','','','','','','',[]);
  }

  ngOnInit() {
  }

  createCharacter(){
    Object.keys(this.characterDisplayed).forEach((key)=>{
      this.character[key] = this.characterDisplayed[key];
    })
  }

}
