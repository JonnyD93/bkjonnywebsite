import { Injectable } from '@angular/core';
import {Ability} from "./models/ability.model";
import {Effects} from "./models/effects.model";

@Injectable()
export class AbilitiesService {
  abilities: any;
  private effects: Effects;

  constructor() {
    this.effects = new Effects();
    let abilities: any = {};
    abilities.basicAttack =  new Ability('Basic Attack','health','punched',1,null,null,0);
    abilities.venomAttack =  new Ability('Spit Venom','health','spewed venom on',1.4, this.effects.getWeakVenomAttack(),20,2);

    this.abilities = abilities;
  }

  get(name){
    return Object.assign({},this.abilities[name]);
  }
  getAll(){
    return this.abilities;
  }

}
