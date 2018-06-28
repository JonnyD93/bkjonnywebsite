import {Injectable} from '@angular/core';
import {Ability} from "./models/ability.model";
import {Effects} from "./models/effects.model";
import {AbilitiesService} from './abilities.service';
import {ItemsService} from "./items.service";
import {Entity} from "./models/entity.model";

@Injectable()
export class FakeDataService {
  users: any[];
  PlayerData: { level: number, experience: number, inventory: any[], characters: any[] };

  constructor(private abilitiesService: AbilitiesService, itemsService: ItemsService) {
    let characters = [];
    // Character name, side, health, attack, defence, accuracy, agility, resistance, abilities
    characters.push(new Entity('Jonny', 'human', 250, 15, 50, 100, 10,8, [abilitiesService.get('basicAttack'), abilitiesService.get('venomAttack')]));
    characters.push(new Entity('Howey', 'human', 65, 15, 5, 80, 0,15, [abilitiesService.get('basicAttack')]));
    characters.push(new Entity('James', 'human', 250, 10, 0, 10, 1,10, [abilitiesService.get('basicAttack'), abilitiesService.get('venomAttack')]));
    characters.push(new Entity('Thomas', 'human', 40, 30, 5, 100, 20, 6,[abilitiesService.get('basicAttack')]));
    for(let x = 0; x<1;x++)
      characters.push(new Entity("Vampire", 'vampire', 1000, 0, 3, 60, 1,5, [this.abilitiesService.get('venomAttack')]));
    characters[0].inventory.push(itemsService.get('dagger'));
    characters[0].inventory.push(itemsService.get('chickenStave'));
    characters[0].inventory.push(itemsService.get('helm'));
    this.PlayerData = {level: 0, experience: 0, inventory: [], characters: characters};
    this.updateCharacters();
  }
  updateCharacters(){
    for (let character of this.PlayerData.characters) {
      for (let item of character.inventory) {
        character[item.type] += item.itemVariable;
        if (item.itemAbilities != null) {
          for (let ability of item.itemAbilities)
            character.abilities.push(ability);
        }
      }
    }
  }
}

