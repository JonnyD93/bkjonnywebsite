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
    abilities.basicAttack =  new Ability('Basic Attack','health','punched',1,null,null,2);
    abilities.venomAttack =  new Ability('Spit Venom','health','spewed venom on',1.4, this.effects.getWeakVenomAttack(),90,20);
    abilities.stabAttack =  new Ability('Stab','health','stabbed',1.5, this.effects.getBleedEffect(),30,20);

    this.abilities = abilities;
  }

  get(name){
    return Object.assign({},this.abilities[name]);
  }
  getAll(){
    return this.abilities;
  }

}
