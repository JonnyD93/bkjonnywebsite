import {Ability} from "./ability.model";
import {Effect} from "./effect.model";
import {Item} from "./item.model";

export class Entity {
  name: string;
  side: string;
  health: number;
  attack: number;
  defence: number;
  accuracy: number;
  agility: number;
  abilities: Ability[];
  activeEffects: Effect[];
  inventory: Item[];

  constructor(name,side,health,attack, defence, accuracy, agility, abilities){
    this.name = name;
    this.side = side;
    this.health = health;
    this.attack = attack;
    this.defence = defence;
    this.accuracy = accuracy;
    this.agility = agility;
    this.abilities = abilities;
    this.activeEffects = [];
  }

}
