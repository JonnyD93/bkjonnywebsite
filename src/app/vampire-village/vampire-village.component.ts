import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-vampire-village',
  templateUrl: './vampire-village.component.html',
  styleUrls: ['./vampire-village.component.css']
})
export class VampireVillageComponent implements OnInit, AfterViewInit {

  playerAttributes: { level: number, experience: number, inventory: any[], stats: { health: number, defence: number, attack: number, accuracy: number } }

  vampires: { health: number, attack: number, defence: number, accuracy, agility: number, side: string, name: string }[] = [];
  characters: { health: number, attack: number, defence: number, accuracy, agility: number, side: string, name: string }[] = [];
  room: any[] = [];
  characterDisplays: any[] = [];
  report: any[] = [];


  constructor() {
    this.characters.push({
      name: 'Jonny',
      health: 100,
      defence: 0,
      attack: 10,
      accuracy: 60,
      agility: 10,
      side: 'human'
    });
    this.characters.push({
      name: 'Howey',
      health: 75,
      defence: 3,
      attack: 10,
      accuracy: 90,
      agility: 5,
      side: 'human'
    });
    this.createVampires(20);
    for (let character of this.characters)
      this.characterDisplays.push(Object.keys(character))

  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.turnSystem();
  }
  createVampires(y) {
    for (let x = 0; x < (this.rndInt(y) ) + 1; x++)
      this.vampires.push({
        name: "Basic Vampire",
        health: this.rndInt(60),
        attack: this.rndInt(5),
        defence: this.rndInt(3),
        accuracy: this.rndInt(30),
        agility: this.rndInt(15),
        side: 'vampire'
      })
  }

  rndInt(x: number) {
    return Math.round(Math.random() * x)
  }

  sortTurns() {
    this.room = [];
    for (let vampire of this.vampires) {
      this.room.push(vampire)
    }
    for (let character of this.characters) {
      this.room.push(character)
    }
    this.room.sort((a, b) => {
      if (a.agility < b.agility)
        return 1;
      if (a.agility > b.agility)
        return -1;
      return 0;
    })
  }

  checkDead(stat: { health: number }) {
    if (stat.health < 1)
      return true;
    return false;
  }

  damageCalculation(attacker: any, defender: any) {
    if ((attacker.accuracy - Math.round(((defender.agility + attacker.accuracy) / attacker.accuracy))) >= this.rndInt(101)) {
      let defend = this.rndInt(defender.defence)
      defender.health -= attacker.attack - defend;
      this.report.push(attacker.name + ' hit ' + defender.name + ' for ' + (attacker.attack - defend))
    }
    else
      this.report.push(attacker.name + ' Missed.')
  }

  attack(index: number) {
    this.sortTurns();
    this.report = [];
    for (let character of this.room) {
      console.log(character)
      if (character.side === 'human') {
        if ((character.accuracy - Math.round(((this.vampires[index].agility + character.accuracy) / character.accuracy))) >= this.rndInt(101)) {
          let defend = this.rndInt(this.vampires[index].defence)
          this.vampires[index].health -= character.attack - defend;
          this.report.push(character.name + ' hit ' + this.vampires[index].name + ' for ' + (character.attack - defend))
        }
        else
          this.report.push(character.name + ' Missed.')
        if (this.checkDead(this.vampires[index]))
          this.vampires.splice(index, 1)
      }
      if (character.side === 'vampire') {
        if ((character.accuracy - Math.round(((this.characters[0].agility + character.accuracy) / character.accuracy))) >= this.rndInt(101)) {
          let defend = this.rndInt(this.characters[0].defence);
          this.characters[0].health -= character.attack - defend;
          this.report.push(character.name + ' hit ' + this.characters[0].name + ' for ' + (character.attack - defend))
        }
        else
          this.report.push(character.name + ' Missed.')
      }
    }
  }

  turnSystem(){
    this.report = [];
    if(this.room.length===0){
      this.sortTurns();
      this.turnSystem();
    }
    if(this.room.length >= 1 && this.room[0].side === 'human'){
      for(let vampire of this.vampires){
        document.getElementById('enemy'+ this.vampires.indexOf(vampire)).addEventListener("click", () => {
          this.damageCalculation(this.room[0],vampire);
          if (this.checkDead(vampire))
            this.vampires.splice(this.vampires.indexOf(vampire), 1);
          this.room.splice(0,1);
          this.turnSystem();
        })
      }
    }
    if(this.room.length >= 1 && this.room[0].side === 'vampire'){
      this.damageCalculation(this.room[0], this.characters[Math.floor(Math.random()*this.characters.length)]);
      this.room.splice(0,1);
      this.turnSystem();
    }

    //
  }
}
