import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbilitiesService} from "../services/abilities.service";

@Component({
  selector: 'app-vampire-village',
  templateUrl: './vampire-village.component.html',
  styleUrls: ['./vampire-village.component.css']
})
export class VampireVillageComponent implements OnInit, AfterViewInit {

  playerAttributes: { level: number, experience: number, inventory: any[], stats: { health: number, defence: number, attack: number, accuracy: number } };
  effect: {name:string, type:string, variable: number, length: number};
  ability: {name:string, damageMultiplier: number, effect: {name:string, type:string, variable: number, length: number}, effectChance: number, coolDown: number, currentCoolDown: number}[] = [];
  vampires: { health: number, attack: number, defence: number, accuracy, agility: number, side: string, name: string }[] = [];
  characters: { health: number, attack: number, defence: number, accuracy, agility: number, side: string, name: string, abilities: any[] }[] = [];
  charactersHealth: any[] = [];
  room: any[] = [];
  characterDisplays: any[] = [];
  report: any[] = [];
  scrolled: boolean = false;
  hits = [];

  constructor(private abilitiesService: AbilitiesService) {
    this.characters.push({
      name: 'Jonny',
      health: 100,
      defence: 0,
      attack: 10,
      accuracy: 60,
      agility: 3,
      side: 'human',
      abilities: [abilitiesService.get('basicAttack'),abilitiesService.get('venomAttack')]
    });
    this.characters.push({
      name: 'Howey',
      health: 75,
      defence: 3,
      attack: 10,
      accuracy: 90,
      agility: 5,
      side: 'human',
      abilities: [abilitiesService.get('basicAttack')]
    });
    this.characters.push({
      name: 'James',
      health: 120,
      defence: 6,
      attack: 3,
      accuracy: 95,
      agility: 30,
      side: 'human',
      abilities: [abilitiesService.get('basicAttack')]
    });
    this.characters.push({
      name: 'Thomas',
      health: 45,
      defence: 4,
      attack: 30,
      accuracy: 50,
      agility: 4,
      side: 'human',
      abilities: [abilitiesService.get('basicAttack')]
    });
    this.createVampires(20);
    for (let character of this.characters)
      this.characterDisplays.push(Object.keys(character));
    for (let character of this.characters)
      this.charactersHealth.push(character.health);
    this.sortTurns();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window['$']("#reportbox").on('scroll', ()=> {
      this.scrolled = true;
    });
    this.startGame();
  }
  /*updateScroll() {
      const element = document.getElementById("reportbox");
      element.scrollTop = element.scrollHeight;
  }*/
  checkPlayerActive(character){
    return this.room[0].side === 'human' && this.room[0].name === character.name;
  }

  healthCalculation(currentHeatlh,maxHealth){
    console.log(currentHeatlh,maxHealth)
    return Math.round((currentHeatlh/maxHealth)*100);
  }

  createVampires(y) {
    for (let x = 0; x < (this.rndInt(y) ) + 1; x++)
      this.vampires.push({
        name: "Basic Vampire",
        health: this.rndInt(200),
        attack: this.rndInt(50),
        defence: this.rndInt(3),
        accuracy: this.rndInt(100),
        agility: this.rndInt(15),
        side: 'vampire'
      })
  }

   rndInt(x: number) {
    return Math.round(Math.random() * x)
  }
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

  damageCalculation(attacker: any, defender: any) {
    if ((attacker.accuracy - Math.round(((defender.agility + attacker.accuracy) / attacker.accuracy))) >= this.rndInt(101)) {
      let defend = this.rndInt(defender.defence);
      if ((attacker.attack - defend) > 0)
        return ( attacker.attack - defend);
    }
    return 0;
  }

  updateReport(Missed: boolean, Defender?: string, damage?: number) {
    if (Missed)
      this.report.push(this.room[0].name + ' Missed.');
    else
      this.report.push(this.room[0].name + ' hit ' + Defender + ' for ' + damage);
  }

  startGame() {
    if (this.room[0].side === 'human') {
      document.getElementById( this.room[0].name + 'id').classList.add('startTurn');
    }
    if (this.room[0].side === 'vampire') {
      let index = Math.floor(Math.random() * this.characters.length);
      let damage = this.damageCalculation(this.room[0], this.characters[index]);
      if (damage == 0)
        this.updateReport(true);
      else {
        this.characters[index].health -= damage;
        window['M'].toast({html: (this.characters[index].name + ' took ' + damage + ' damage'), classes: 'red'});
        this.updateReport(false, this.characters[index].name, damage);
      }
      this.room.splice(0, 1);
      this.turnSystem();
    }
  }

  attack(event, i: number) {
    console.log(this.room);
    console.log(this.characters);
    let radioButtons = window['$'] ('input[name=abilities]');
    console.log(window['$'](":radio[name='abilities']").index(window['$'](":radio[name='abilities']:checked")));
    if(this.room[0].side  === 'human') {
      document.getElementById(this.room[0].name + 'id').classList.remove('startTurn');
      document.getElementById(this.room[0].name + 'id').classList.add('endTurn');
    }
    let damage = this.damageCalculation(this.room[0], this.vampires[i]);
    if (damage == 0) {
      this.spawnStatus(event,"Missed");
      this.updateReport(true);
    }
    else {
      this.vampires[i].health -= damage;
      this.updateReport(false, this.vampires[i].name,damage);
      this.spawnStatus(event,damage);
      window['M'].toast({html: (this.room[0].name+' hit '+this.vampires[i].name+' for '+damage + ' damage'), classes: 'green'});
      if (this.vampires[i].health < 1) {
        this.vampires.splice(i, 1);
        window['M'].toast({html: (this.vampires[i].name+' died'), classes: 'black'})
      }
    }
    this.room.splice(0, 1);
    //this.updateScroll();
    this.turnSystem();
  }

  spawnStatus = (event, statusText) => {
    let obj = {
      styles: {left: event.clientX +10+ 'px',top:event.clientY + 'px'},
      statusText
    };
    this.hits.push(obj);
    setTimeout(()=>this.hits.splice(this.hits.indexOf(obj), 1), 1200);
  };

  turnSystem() {
    if (this.room.length === 0) {
      this.sortTurns();
      this.turnSystem();
    }
    if (this.room.length >= 1 && this.room[0].side === 'human') {
      document.getElementById(this.room[0].name + 'id').classList.remove('endTurn');
      document.getElementById( this.room[0].name + 'id').classList.add('startTurn');
    }
    if (this.room.length >= 1 && this.room[0].side === 'vampire') {
      let index = Math.floor(Math.random() * this.characters.length);
      let damage = this.damageCalculation(this.room[0], this.characters[index]);
      if (damage == 0)
        this.updateReport(true);
      else {
        this.characters[index].health -= damage;
        window['M'].toast({html: (this.characters[index].name+' took '+damage + ' damage'), classes: 'red'});
        this.updateReport(false, this.characters[index].name, damage);
      }
      this.room.splice(0, 1);
      this.turnSystem();
    }
    //this.updateScroll();
  }
}
