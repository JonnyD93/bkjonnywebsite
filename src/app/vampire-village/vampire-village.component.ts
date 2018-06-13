import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbilitiesService} from "../services/abilities.service";
import {Entity} from "../services/models/entity.model";
import {Ability} from "../services/models/ability.model";

@Component({
  selector: 'app-vampire-village',
  templateUrl: './vampire-village.component.html',
  styleUrls: ['./vampire-village.component.css']
})
export class VampireVillageComponent implements OnInit, AfterViewInit {
  // The entire list of what the database will hold will be removed from here
  // PlayerData: { level: number, experience: number, inventory: any[], characters: any[]};
  // Arrays of each entity in the game
  vampires: Entity[] = [];
  characters: Entity[] = [];
  // Simply that Each Player Characters Health
  charactersHealth: any[] = [];
  // Each characters different type of Object Keys, as a separate variable
  characterDisplays: any[] = [];
  // The room variable is populated with the turns of the game
  room: any[] = [];
  // The report of the match --- Not important yet
  report: any[] = [];
  // The hits that pop up when a creature is attacked.
  hits: any = [];

  constructor(private abilitiesService: AbilitiesService) {
    // All character Data will be received from a Database
    this.characters.push(new Entity('Jonny','human', 100, 10, 0, 60, 5 , [abilitiesService.get('basicAttack'), abilitiesService.get('venomAttack')]));
    this.characters.push(new Entity('Howey','human', 65, 15, 5, 80, 1, [abilitiesService.get('basicAttack')]));
    this.characters.push(new Entity('James','human', 250, 50, 0, 10, 0,  [abilitiesService.get('basicAttack'), abilitiesService.get('venomAttack')]));
    this.characters.push(new Entity('Thomas','human', 40, 5, 5, 100, 20,  [abilitiesService.get('basicAttack')]));
    // Proper Generation will be created later on
    this.createVampires(20);

    // Setting up stuff for Displaying purposes
    for (let character of this.characters)
      this.characterDisplays.push(Object.keys(character));
    for (let character of this.characters)
      this.charactersHealth.push(character.health);
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
    return this.room[0].side === 'human' && this.room[0].name === character.name;
  }

  // Function to detect the current Health of the Current Player
  healthCalculation(currentHeatlh, maxHealth) {
    return Math.round((currentHeatlh / maxHealth) * 100);
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
  spawnToast(char: string, style: string, ability: string,receiving: boolean, dead: boolean, damage?: number, char2?: string) {
    if (receiving)
      return window['M'].toast({html: (char +' '+ ability +' '+ damage + ' for damage'), classes: style});
    if (dead)
      return window['M'].toast({html: (char + ' died'), classes: style});
    if (!receiving)
      return window['M'].toast({html: (char + ' ' + ability + ' ' + char2 + ' for ' + damage + ' damage'), classes: style})
  }

  // Will be used after the battle concludes
  updateReport(Missed: boolean, Defender?: string, damage?: number) {
    if (Missed)
      this.report.push(this.room[0].name + ' Missed.');
    else
      this.report.push(this.room[0].name + ' hit ' + Defender + ' for ' + damage);
  }

  // Planned to be Removed
  createVampires(y) {
    for (let x = 0; x < (this.rndInt(y) ) + 1; x++)
      this.vampires.push(new Entity("Basic Vampire", 'vampire', this.rndInt(200), this.rndInt(20), this.rndInt(3), 100, this.rndInt(15), [this.abilitiesService.get('basicAttack')]));
  }

  // Sorts the Turns based on Agility
  sortTurns() {
    this.room = [];
    for (let vampire of this.vampires)
      this.room.push(vampire)
    for (let character of this.characters)
      this.room.push(character)
    this.room.sort((a, b) => {
      if (a.agility < b.agility)
        return 1;
      if (a.agility > b.agility)
        return -1;
      return 0;
    });
  }

  damageCalculation(attacker: any, defender: any, abilitySelected: number): [Entity, Ability, number] {
    let ability = attacker.abilities[abilitySelected];
    let type = ability.type;
    if ((attacker.accuracy - Math.round(((defender.agility + attacker.accuracy) / attacker.accuracy))) >= this.rndInt(101)) {
      let defend = this.rndInt(defender.defence);
      let attack = attacker.attack * attacker.abilities[abilitySelected].damageMultiplier;
      if (type === "health" && (attack - defend) > 0) {
        defender.health -= attack;
        return [defender, attacker.abilities[abilitySelected], attack];
      }
      if (type === 'name') {
        defender.name = attacker.abilities[abilitySelected].name;
        return [defender, attacker.abilities[abilitySelected], attack];
      }
      else {
        if (defender[type] - attacker.attack >= 0) {
          defender[type] = attack;
          return [defender, attacker.abilities[abilitySelected], attack];
        }
        else {
          defender[type] -= 0;
          return [defender,  attacker.abilities[abilitySelected], attack];
        }
      }
    }
    // Returns null if the attacker misses
    return null;
  }
  // Calculates the Effect damage for that turn
  effectCalculation(attacker: any, defender: any, abilitySelected: number): [Entity, Ability, number]{
    let ability = attacker.abilities[abilitySelected];
    let effect = ability.effect;
    let type = ability.effect.type;
    if ((ability.effectChance >= this.rndInt(101))) {
      let defend = this.rndInt(defender.defence);
      let attack = effect.effectVariable;
      if (type === "health") {
        defender.health -= attack;
        return [defender, effect, attack];
      }
      else {
        if (defender[type] - attacker.attack >= 0) {
          defender[type] = attack;
          return [defender, effect, attack];
        }
        else {
          defender[type] -= 0;
          return [defender,  effect, attack];
        }
      }
    }
    // Returns null if the attacker misses
    return null;
  }

  // Starts the Game
  startGame() {
    if (this.room[0].side === 'human') {
      document.getElementById(this.room[0].name + 'id').classList.add('startTurn');
    }
    if (this.room[0].side === 'vampire') {
      let index = Math.floor(Math.random() * this.characters.length);
      let attack = this.damageCalculation(this.room[0], this.characters[index], 0);
      if (attack === null)
        this.updateReport(true);
      else {
        let damage = attack[2];
        this.characters[index] = attack[0];
        window['M'].toast({html: (this.characters[index].name + ' took ' + damage + ' damage'), classes: 'red'});
        this.updateReport(false, this.characters[index].name, damage);
      }
      this.room.splice(0, 1);
      this.turnSystem();
    }
  }

  // The click action for the player
  attack(event, i: number) {
    let indexSelected = window['$'](":radio[name='abilities']").index(window['$'](":radio[name='abilities']:checked"));
    console.log(indexSelected);
    document.getElementById(this.room[0].name + 'id').classList.remove('startTurn');
    document.getElementById(this.room[0].name + 'id').classList.add('endTurn');
    let attack = this.damageCalculation(this.room[0], this.vampires[i], indexSelected);
    if (attack === null) {
      this.spawnStatus(event, "Missed");
      this.updateReport(true);
    }
    else {
      let damage = attack[2];
      this.vampires[i].health -= damage;
      this.updateReport(false, this.vampires[i].name, damage);
      this.spawnStatus(event, damage);
      this.spawnToast(this.room[0].name, 'green', attack[1].description,false, false, damage, this.vampires[i].name);
      if (this.vampires[i].health < 1) {
        this.vampires.splice(i, 1);
        this.spawnToast(this.vampires[i].name,'black', attack[1].description, false, true);
      }
    }
    this.room.splice(0, 1);
    this.turnSystem();
  }

  // The turn system of the game
  turnSystem() {
    if (this.room.length === 0) {
      this.sortTurns();
      this.turnSystem();
    }
    if (this.room.length >= 1 && this.room[0].side === 'human') {
      document.getElementById(this.room[0].name + 'id').classList.remove('endTurn');
      document.getElementById(this.room[0].name + 'id').classList.add('startTurn');
    }
    if (this.room.length >= 1 && this.room[0].side === 'vampire') {
      let index = Math.floor(Math.random() * this.characters.length);
      let attack = this.damageCalculation(this.room[0], this.characters[index], 0);
      if (attack === null)
        this.updateReport(true);
      else {
        let damage = attack[2];
        this.characters[index] = attack[0];
        this.characters[index].health -= damage;
        this.spawnToast(this.room[0].name,'red', attack[1].description, false, false, damage, this.characters[index].name);
        this.updateReport(false, this.characters[index].name, damage);
      }
      this.room.splice(0, 1);
      this.turnSystem();
    }
  }
}
