import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbilitiesService} from "../services/abilities.service";
import {Entity} from "../services/models/entity.model";
import {Ability} from "../services/models/ability.model";
import {Effect} from "../services/models/effect.model";

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
  characterDisplays: any[][] = [[], [], []];
  enemyDisplays: any[] = [];
  // The turns variable is populated with the turns of the game
  turns: Entity[] = [];
  // The report of the match --- Not important yet
  report: any[] = [];
  // The hits that pop up when a creature is attacked.
  hits: any = [];

  constructor(private abilitiesService: AbilitiesService) {
    // All character Data will be received from a Database
    this.room.push(new Entity('Jonny', 'human', 100, 13, 0, 60, 5, [abilitiesService.get('basicAttack'), abilitiesService.get('venomAttack')]));
    this.room.push(new Entity('Howey', 'human', 65, 15, 5, 80, 0, [abilitiesService.get('basicAttack')]));
    this.room.push(new Entity('James', 'human', 250, 10, 0, 10, 1, [abilitiesService.get('basicAttack'), abilitiesService.get('venomAttack')]));
    this.room.push(new Entity('Thomas', 'human', 40, 30, 5, 100, 20, [abilitiesService.get('basicAttack')]));
    // Proper Generation will be created later on
    this.createVampires(20);
    // Setting up stuff for Displaying purposes
    for (let character of this.room.filter(x => x.side === "human")) {
      this.characterDisplays[0].push(Object.keys(character));
      this.characterDisplays[1].push(character);
      this.characterDisplays[2].push(character.health);
    }
    for (let entity of this.room.filter(x => x.side != "human"))
      this.enemyDisplays.push(entity);
    // Initial setup of the game
    this.sortTurns();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.startGame();
  }

  // Function that returns a random int up to x
  rndInt(x: number) {
    return Math.round(Math.random() * x)
  }

  // Function to detect which player is active, and return true or false on it.
  checkPlayerActive(character) {
    return this.turns[0].side === 'human' && this.turns[0].name === character.name;
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

  // Creates and pushes a Toast that displays what happened during each turn
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

  // Planned to be Removed
  createVampires(y) {
    for (let x = 0; x < (1) + 1; x++)
      this.room.push(new Entity("Vampire", 'vampire', 100, 0, 3, 100, 1, [this.abilitiesService.get('venomAttack')]));
  }

  // Sorts the Turns based on Agility
  sortTurns() {
    this.turns = [];
    for(let entity of this.room)
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
    let type = ability.type;
    if ((attacker.accuracy >= this.rndInt(100 + defender.agility))) {
      let defend = this.rndInt(defender.defence);
      let attack = Math.round(attacker.attack * attacker.abilities[abilitySelected].damageMultiplier);
      defender = this.applyEffect(defender, ability);
      if (type === "health") {
        if ((attack - defend) >= 0)
          defender.health -= attack;
        return [defender, attacker.abilities[abilitySelected], attack - defend];
      }
      if (type === 'name') {
        defender.name = attacker.abilities[abilitySelected].name;
        return [defender, attacker.abilities[abilitySelected], attack];
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
    return effects;
  }

  // Starts the Game
  startGame() {
    if (this.turns[0].side === 'human') {
      document.getElementById(this.turns[0].name + 'id').classList.add('startTurn');
    }
    if (this.turns[0].side === 'vampire') {
      this.vampireAttack();
      this.turns.splice(0, 1);
      this.turnSystem();
    }
  }

  // Vampire Ai
  vampireAttack() {
    let enemies = this.room.filter(x => x.side != "vampire");
    let index = Math.floor(Math.random() * enemies.length);
    let defender = this.room[this.room.indexOf(enemies[index])];
    let attack = this.damageCalculation(this.turns[0], defender, 0);
    if (attack === null)
      this.updateReport(true);
    else {
      let damage = attack[2];
      window['M'].toast({html: (defender.name + ' took ' + damage + ' damage'), classes: 'red'});
      this.updateReport(false, defender.name, damage);
    }
  }

  // The click action for the player
  attack(event, index: number) {
    if (this.turns.length >= 1 && this.turns[0].side === 'human') {
      let enemies = this.room.filter(x => x.side != "human");
      let defender = this.room[this.room.indexOf(enemies[index])];
      let indexSelected = window['$'](":radio[name='abilities']").index(window['$'](":radio[name='abilities']:checked"));
      document.getElementById(this.turns[0].name + 'id').classList.remove('startTurn');
      document.getElementById(this.turns[0].name + 'id').classList.add('endTurn');
      let attack = this.damageCalculation(this.turns[0], defender, indexSelected);
      if (attack === null) {
        this.spawnStatus(event, "Missed");
        this.updateReport(true);
      }
      else {
        let damage = attack[2];
        this.updateReport(false, defender.name, damage);
        this.spawnStatus(event, damage);
        this.spawnToast(this.turns[0].name, 'green', attack[1].description, false, damage, defender.name);
        if (defender.health < 1) {
          this.spawnToast(defender.name, 'black', attack[1].description, true);
          this.room.splice(index, 1);
        }
      }
      this.turns.splice(0, 1);
    }
    this.turnSystem();
  }

  // The turn system of the game
  /*turnSystem() {
    let index = this.room.indexOf(this.turns[0]);
    if (this.turns.length >= 1 && this.turns[0].side === 'human') {
      document.getElementById(this.turns[0].name + 'id').classList.remove('endTurn');
      document.getElementById(this.turns[0].name + 'id').classList.add('startTurn');
      if (this.room[index].activeEffects.length > 0)
        this.effectTurn(this.room[index]);
    }
    if (this.turns.length >= 1 && this.turns[0].side === 'vampire') {
      if (this.room[index].activeEffects.length > 0)
        this.effectTurn(this.room[index]);
      if (this.room[index].health < 1) {
        this.spawnToast(this.room[index].name, 'black', 'effect', true);
        this.room.splice(index, 1);
      }
      this.vampireAttack();
      this.turns.splice(0, 1);
      this.turnSystem();
    }
    if (this.turns.length === 0) {
      this.sortTurns();
      this.turnSystem();
    }
  }*/

  turnSystem() {
    if (this.turns.length == 0) {
      this.sortTurns();
      this.turnSystem();
    } else {
      let entity = this.room[this.room.indexOf(this.turns[0])];
      if(entity==undefined){
        console.log('called',entity)
        this.sortTurns();
        this.turnSystem();
      }
      if (entity.side === 'human') {
        document.getElementById(this.turns[0].name + 'id').classList.remove('endTurn');
        document.getElementById(this.turns[0].name + 'id').classList.add('startTurn');
        if (entity.activeEffects.length > 0)
          this.effectTurn(entity);
      } else {
        if(entity.activeEffects.length > 0)
          this.effectTurn(entity)
        if(entity.health < 1) {
          this.spawnToast(entity.name, 'black', 'effect', true);
          this.room.splice(this.room.indexOf(this.turns[0]), 1);
        }
        this.vampireAttack();
        this.turns.splice(0, 1);
        this.turnSystem();
      }
    }
  }
}
