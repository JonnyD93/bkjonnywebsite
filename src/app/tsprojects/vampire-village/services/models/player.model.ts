import {Entity} from "./entity.model";
import {Item} from "./item.model";

export class Player {

  displayName: string;
  accountId: string;
  level: number;
  experience: number;
  characters: Entity[];
  inventory: Item[];


  constructor(displayName, accountId){
    this.displayName = displayName;
    this.accountId = accountId;
    this.level = 1;
    this.experience = 0;
    this.characters = [];
    this.inventory = [];
  }
}
