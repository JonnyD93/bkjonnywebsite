import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbilitiesService} from "./services/abilities.service";
import {Entity} from "./services/models/entity.model";
import {Ability} from "./services/models/ability.model";
import {Effect} from "./services/models/effect.model";
import {ItemsService} from "./services/items.service";
import {FakeDataService} from "./services/fakeData.service";
import {promise} from "selenium-webdriver";

@Component({
  selector: 'app-vampire-village',
  templateUrl: './vampire-village.component.html',
  styleUrls: ['./vampire-village.component.css']
})
export class VampireVillageComponent implements OnInit, AfterViewInit {
  // The entire list of what the database will hold will be removed from here
  // PlayerData: { level: number, experience: number, inventory: any[], characters: any[]};
  // Array for all entitys in the game
  room: any[] = [];
  // Each characters different type of Object Keys, as a separate variable
  characterDisplays: any = {keys: [], characters: [], healths: []};
  enemyDisplays: any = {entities: [], healths: []};
  // The turns variable is populated with the turns of the game
  turns: any[] = [];
  // The report of the match --- Not important yet
  report: any[] = [];
  // The hits that pop up when a creature is attacked.
  hits: any = [];

  constructor(private fakeData: FakeDataService) {
    // Pulling from the fake data Service
    for (let character of fakeData.PlayerData.characters)
      this.room.push(character);
    // Setting up stuff for Displaying purposes
    for (let character of this.room.filter(x => x.side === "human")) {
      this.characterDisplays.keys.push(Object.keys(character));
      this.characterDisplays.characters.push(character);
      this.characterDisplays.healths.push(character.health);
    }
    for (let entity of this.room.filter(x => x.side != "human")) {
      this.enemyDisplays.entities.push(entity);
      this.enemyDisplays.healths.push(entity.health);
    }
    // Initial setup of the game
    this.sortTurns();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.startGame();
  }

  // Adds a Delay to the TS Cite https://basarat.gitbooks.io/typescript/docs/async-await.html
  async delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
      setTimeout(() => {
        resolve(count);
      }, milliseconds);
    });
  }

  // Function that returns a random int up to x
  rndInt(x: number) {
    return Math.round(Math.random() * x)
  }

  //Determines the color of the enemy Entity based on amount of health
  calcColor(entity, health) {
      let x = 100-((entity.health / health) * 100);
      return `rgb(${x}%,${x}%,${x}%)`;
  }

  //Updates the All Displays
  updateDisplays(defender) {
    if(this.characterDisplays.characters.indexOf(defender) != -1)
      Object.keys(this.characterDisplays).forEach((key)=>{
        this.characterDisplays[key].splice(this.characterDisplays.characters.indexOf(defender), 1);
      });

    else
      for (let key of Object.keys(this.enemyDisplays))
        this.enemyDisplays[key].splice(this.enemyDisplays.entities.indexOf(defender), 1);
  }

  // Checks if the entity is dead
  async checkDead(defender) {
    if (defender.health <= 0) {
      this.spawnToast(defender.name + ' died', 'black');
      defender.death = true;
      await this.delay(1000, 1);
      defender.death = false;
      this.turns.splice(this.turns.indexOf(defender), 1);
      this.room.splice(this.room.indexOf(defender), 1);
      this.updateDisplays(defender);
    }
  }

  // Checks if the Ability is from an Item, and returns that Item's Name
  checkItemAbility(character, ability) {
    let itemName = '';
    if (character.inventory.length > 0)
      character.inventory.forEach ((item)=> {
        if (item.itemAbilities != null)
          item.itemAbilities.forEach ((abilityItem)=> {
            if (ability === abilityItem)
              itemName = item.name;});
      if (itemName === '')
        return '';
      return '( ' + itemName + ' )';
    });
    return itemName;
  }

  // Needs to be fixed
  checkLastActiveAbility(ability) {
    if (ability.currentCooldown > 0)
      return false;
    return true;
  }

  // Function to detect which player is active, and return true or false on it.
  checkPlayerActive(character) {
    if (this.turns != undefined)
      return this.turns[0] === character;
  }

  // Function to detect the current Health of the Current Player
  healthCalculation(currentHealth, maxHealth) {
    return Math.round((currentHealth / maxHealth) * 100);
  }

  // Creates an hit object to display Players damage on a given target
   spawnToast( description, style){
   let obj = {styles: {backgroundColor: style}, description: description};
    this.hits.push(obj);
    this.report.push(description);
    setTimeout(() => this.hits.splice(this.hits.indexOf(obj), 1), 5000);
   }

  // Sorts the Turns based on Agility
  sortTurns() {
    this.turns = [];
    this.room.forEach((entity)=>{this.turns.push(entity);});
    this.turns.sort((a, b) => {
      if (a.agility < b.agility)
        return 1;
      if (a.agility > b.agility)
        return -1;
      return 0;
    });
  }

  damageCalculation(attacker: Entity, defender: Entity, abilitySelected: number) {
    let ability = attacker.abilities[abilitySelected];
    ability.currentCooldown = ability.cooldown;
    let type = ability.type;
    if ((attacker.accuracy >= this.rndInt(100 + defender.agility))) {
      let attack = Math.floor(attacker.attack * attacker.abilities[abilitySelected].damageMultiplier);
      this.applyEffect(defender, ability);
      if (type === "health") {
        let defend = this.rndInt(defender.defense);
        if (attack < 0)
          defender.health -= attack;
        if ((attack - defend) <= 0)
          this.spawnToast((defender.name + ' blocked ' + attacker.name + ' by ' + Math.abs(attack-defend)), 'blue');
        if ((attack - defend) > 0) {
          this.spawnToast((attacker.name + ' ' + ability.description + ' ' + defender.name + ' for ' + (attack - defend)), 'red');
          defender.health -= (attack - defend);
          this.checkDead(defender);
        }
      }
      else {
        if (defender[type] - attacker.attack >= 0) {
          defender[type] -= attack;
        }
        else {
          defender[type] = 0;
        }
      }
    } else {
      this.spawnToast(attacker.name + ' missed', '#00bb00');
    }
  }

  // Apples the effect to the person defending
  applyEffect(defender: Entity, ability: Ability) {
    if (ability.effect != null && (ability.effectChance >= this.rndInt(100))) {
      this.spawnToast(defender.name + ' is now ' + ability.effect.name, ability.effect.color);
      defender.activeEffects.push(JSON.parse(JSON.stringify(ability.effect)));
    }
  }

  // Calculates the Effect damage for that turn
  effectCalculation(defender, effect): [Entity, Effect, number] {
    let type = effect.type;
    if (defender[type] - effect.effectVariable >= 0)
      defender[type] -= effect.effectVariable;
    else
      defender[type] = 0;
    return [defender, effect, effect.effectVariable];
  }

  // Applies the Effect Damage & Duration of the Effect
  effectTurn(entity) {
    let effects: any[] = [];
    for (let effect of entity.activeEffects) {
      let index = entity.activeEffects.indexOf(effect);
      entity.activeEffects[index].duration -= 1;
      if (entity.activeEffects[index].duration <= 0)
        entity.activeEffects.splice(index, 1);
      effects.push(this.effectCalculation(entity, effect));
    }
    this.checkDead(entity);
    return effects;
  }

  // Entity Ai
  entityAttack(entity) {
    let enemies = this.room.filter(x => x.side != entity.side);
    let index = Math.floor(Math.random() * enemies.length);
    let defender = this.room[this.room.indexOf(enemies[index])];
    this.damageCalculation(entity, defender, this.rndInt(entity.abilities.length - 1));
  }

  // The click action for the player
  attack(defender) {
    if (this.turns.length >= 1) {
      let attacker = this.turns[0];
      if (attacker.side === "human" && defender != attacker && !(attacker.health <= 0)) {
        let indexSelected = window['$'](":radio[name='abilities']").index(window['$'](":radio[name='abilities']:checked"));
        if (indexSelected != -1) {
          attacker.activeTurn = false;
          this.damageCalculation(attacker, defender, indexSelected);
          //this.spawnStatus(event, damage);
        }
      }
      this.turns.splice(0, 1);
    }
    this.turnSystem();
  }

  // Starts the Game
  startGame() {
    if (this.turns[0].side === 'human') {

    } else {
      this.entityAttack(this.turns[0]);
      this.turns.splice(0, 1);
      this.turnSystem();
    }
  }

  skipTurn(bool): boolean {
    if (!bool && this.turns[0].side === 'human') {
      this.turns.splice(0, 1);
      this.turnSystem();
    }
    if (bool) {
      let x = 0;
      for (let ability of this.turns[0].abilities) {
        if (ability.currentCooldown > 0)
          x++;
      }
      if (x >= this.turns[0].abilities.length) {
        this.turns.splice(0, 1);
        this.turnSystem();
        return true;
      }
    }
    return false;
  }

  // The turn system of the game
  async turnSystem() {
    if (this.turns.length == 0) {
      this.sortTurns();
      this.turnSystem();
    }
    if (this.turns[0].health <= 0) {
      this.turns.splice(0, 1);
      this.turnSystem();
    }
    let entity = this.room[this.room.indexOf(this.turns[0])];
    if (entity != undefined) {
      this.checkDead(entity);
      for (let ability of entity.abilities)
        ability.currentCooldown--;
      if (this.skipTurn(true))
        return;
      if (entity.side === 'human') {
        if (entity.activeEffects.length > 0)
          this.effectTurn(entity);
        entity.activeTurn = true;
      } else {
        if (entity.activeEffects.length > 0)
          this.effectTurn(entity);
        this.entityAttack(entity);
        this.turns.splice(0, 1);
        await this.delay(1000, 1);
        this.turnSystem();
      }
    } else {
      this.room.splice(this.room.indexOf(entity), 1);
      this.turns.splice(this.room.indexOf(entity), 1);
      this.sortTurns();
      this.turnSystem();
    }
  }
}
