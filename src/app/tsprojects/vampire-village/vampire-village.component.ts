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
  room: Entity[] = [];
  // Each characters different type of Object Keys, as a separate variable
  characterDisplays: any = {keys: [], characters: [], healths: []};
  enemyDisplays: any = {entities: [], healths: []};
  // The turns variable is populated with the turns of the game
  turns: Entity[] = [];
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

  // Adds a Delay to the JS Cite https://basarat.gitbooks.io/typescript/docs/async-await.html
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
    if (entity != null) {
      if (entity.health >= health)
        return '#000000';
      if (entity.health >= health * .8 && entity.health <= health)
        return '#222222';
      if (entity.health >= health * .6 && entity.health <= health * .8)
        return '#444444';
      if (entity.health >= health * .4 && entity.health <= health * .6)
        return '#666666';
      if (entity.health >= health * .2 && entity.health <= health * .4)
        return '#888888';
      if (entity.health <= health * .2)
        return '#aaaaaa';
    }
    return '';
  }

  //Updates the All Displays
  updateDisplays(defender) {
    let charIndex = this.characterDisplays.characters.indexOf(defender);
    let entityIndex = this.enemyDisplays.entities.indexOf(defender);
    if (charIndex != -1)
      for (let key of Object.keys(this.characterDisplays))
        this.characterDisplays[key].splice(charIndex, 1);
    if (entityIndex != -1)
      for (let key of Object.keys(this.enemyDisplays))
        this.enemyDisplays[key].splice(entityIndex, 1);
  }

  //
  async checkDead(defender, attack, boolean) {
    if (defender.health <= 0) {
      this.spawnToast(defender.name, 'black', attack, true);
      if (boolean) {
        defender.death = true;
        await this.delay(1000, 1);
        defender.death = false;
      }
      this.turns.splice(this.turns.indexOf(defender), 1);
      this.room.splice(this.room.indexOf(defender), 1);
      this.updateDisplays(defender);
    }
  }

  // Checks if the Ability is from an Item, and returns that Item's Name
  checkItemAbility(character, ability) {
    let itemName = '';
    if (character.inventory.length > 0) {
      for (let item of character.inventory) {
        if (item.itemAbilities != null) {
          for (let abilityItem of item.itemAbilities) {
            if (ability === abilityItem)
              itemName += item.name + ' ';
          }
        }
      }
      if (itemName === '')
        return '';
      return '( ' + itemName + ')';
    }
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
  spawnStatus = (event, statusText) => {
    let obj = {
      styles: {left: event.clientX + 10 + 'px', top: event.clientY + 'px'},
      statusText
    };
    this.hits.push(obj);
    setTimeout(() => this.hits.splice(this.hits.indexOf(obj), 1), 1200);
  };

  // Creates and pushes a Toast that displays what happened during each turn will be updated
  spawnToast(char: string, style: string, ability: string, dead: boolean, damage?: number, char2?: string) {
    if (!dead) {
      if (damage >= 0)
        return window['M'].toast({
          html: (char + ' ' + ability + ' ' + char2 + ' for ' + damage + ' damage'),
          classes: style
        });
      else
        return window['M'].toast({
          html: (char2 + ' blocked ' + char + ' by ' + Math.abs(damage) + ' damage.'),
          classes: 'light-blue'
        });
    }
    if (dead)
      return window['M'].toast({html: (char + ' died'), classes: style});
  }

  // Will be used after the battle concludes
  updateReport(Missed: boolean, Defender?: string, damage?: number) {
    if (Missed)
      this.report.push(this.turns[0].name + ' Missed.');
    else
      this.report.push(this.turns[0].name + ' hit ' + Defender + ' for ' + damage);
  }

  // Sorts the Turns based on Agility
  sortTurns() {
    this.turns = [];
    for (let entity of this.room)
      this.turns.push(entity);
    this.turns.sort((a, b) => {
      if (a.agility < b.agility)
        return 1;
      if (a.agility > b.agility)
        return -1;
      return 0;
    });
  }

  damageCalculation(attacker: Entity, defender: Entity, abilitySelected: number): [Entity, Ability, number] {
    let ability = attacker.abilities[abilitySelected];
    ability.currentCooldown = ability.cooldown;
    let type = ability.type;
    if ((attacker.accuracy >= this.rndInt(100 + defender.agility))) {
      let defend = this.rndInt(defender.defense);
      let attack = Math.floor(attacker.attack * attacker.abilities[abilitySelected].damageMultiplier);
      defender = this.applyEffect(defender, ability);
      if (type === "health") {
        if (attack < 0) {
          defender.health -= attack;
          return [defender, attacker.abilities[abilitySelected], attack];
        }
        if ((attack - defend) >= 0)
          defender.health -= (attack - defend);
        return [defender, attacker.abilities[abilitySelected], attack - defend];
      }
      else {
        if (defender[type] - attacker.attack >= 0) {
          defender[type] -= attack;
          return [defender, attacker.abilities[abilitySelected], attack];
        }
        else {
          defender[type] = 0;
          return [defender, attacker.abilities[abilitySelected], attack];
        }
      }
    }
    // Returns null if the attacker misses
    return null;
  }

  // Apples the effect to the person defending
  applyEffect(defender: Entity, ability: Ability): Entity {
    if (ability.effect != null && (ability.effectChance >= this.rndInt(100)))
      defender.activeEffects.push(JSON.parse(JSON.stringify(ability.effect)));
    return defender;
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
    this.checkDead(entity, '', true);
    return effects;
  }

  // Entity Ai
  entityAttack(entity) {
    let enemies = this.room.filter(x => x.side != entity.side);
    let index = Math.floor(Math.random() * enemies.length);
    let defender = this.room[this.room.indexOf(enemies[index])];
    let attack = this.damageCalculation(this.turns[0], defender, this.rndInt(entity.abilities.length - 1));
    if (attack === null)
      this.updateReport(true);
    else {
      let damage = attack[2];
      window['M'].toast({html: (defender.name + ' took ' + damage + ' damage'), classes: 'red'});
      this.updateReport(false, defender.name, damage);
      this.checkDead(defender, attack[1].description, true);
    }
  }

  // The click action for the player
  attack(event, defender) {
    if (this.turns.length >= 1) {
      let attacker = this.turns[0];
      if (attacker.side === "human" && defender != attacker && !(attacker.health <= 0)) {
        let indexSelected = window['$'](":radio[name='abilities']").index(window['$'](":radio[name='abilities']:checked"));
        if (indexSelected != -1) {
          document.getElementById(attacker.name + 'id').classList.remove('startTurn');
          document.getElementById(attacker.name + 'id').classList.add('endTurn');
          let attack = this.damageCalculation(attacker, defender, indexSelected);
          if (attack === null) {
            this.spawnStatus(event, "Missed");
            this.updateReport(true);
          }
          else {
            let damage = attack[2];
            this.updateReport(false, defender.name, damage);
            this.spawnStatus(event, damage);
            this.spawnToast(attacker.name, 'green', attack[1].description, false, damage, defender.name);
            this.checkDead(defender, attack[1].description, true);
          }
        }
      } else {
        return event;
      }
      this.turns.splice(0, 1);
    }
    this.turnSystem();
  }

  // Starts the Game
  startGame() {
    if (this.turns[0].side === 'human') {
      document.getElementById(this.turns[0].name + 'id').classList.add('startTurn');
    }
    if (this.turns[0].side === 'vampire') {
      this.entityAttack(this.turns[0]);
      this.turns.splice(0, 1);
      this.turnSystem();
    }
  }

  skipTurn(bool): boolean {
    if (!bool && this.turns[0].side === 'human') {
      document.getElementById(this.turns[0].name + 'id').classList.remove('startTurn');
      document.getElementById(this.turns[0].name + 'id').classList.add('endTurn');
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
      this.checkDead(entity, '', false);
      for (let ability of entity.abilities)
        ability.currentCooldown--;
      if (this.skipTurn(true))
        return;
      if (entity.side === 'human') {
        document.getElementById(this.turns[0].name + 'id').classList.remove('endTurn');
        document.getElementById(this.turns[0].name + 'id').classList.add('startTurn');
        if (entity.activeEffects.length > 0)
          this.effectTurn(entity);
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
