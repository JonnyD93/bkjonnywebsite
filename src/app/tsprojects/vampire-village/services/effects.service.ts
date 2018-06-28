import { Injectable } from '@angular/core';
import {Entity} from "./models/entity.model";
import {AbilitiesService} from "./abilities.service";
import {Effects} from "./models/effects.model";

@Injectable()
export class EffectsService {

  constructor(private abilityService: AbilitiesService) { }

  percentOfHealth : number = 0.03;
  private effects: Effects = new Effects();

  bleedEffect (entity,effect){
    console.log(Math.round( (3 / (effect.duration+1)) * entity.health * this.percentOfHealth), 'bleed');
    entity.health -= Math.round( (3 / (effect.duration+1)) * entity.health * this.percentOfHealth);
  }
  chickenEffect (entity,effect){
    let savEntity = JSON.parse(JSON.stringify(entity));
    Object.keys(new Entity('Chicken',entity.side,entity.health, 1,0,10,2,0,[this.abilityService.get('pluckAttack')])).forEach((key)=>{
      entity[key] = new Entity('Chicken',entity.side,entity.health, 1,0,10,2,0,[this.abilityService.get('pluckAttack')])[key];
    });
    if (effect.duration < 0)
      Object.keys(entity).forEach((key)=>{
      return (key!='health') ? entity[key] = savEntity[key] : entity[key];
      });
  }
  venomEffect (entity,effect) {
    console.log(Math.round((effect.duration+1) * entity.health * this.percentOfHealth),'venom')
   entity.health -= Math.round((effect.duration+1) * entity.health * this.percentOfHealth);
  }

  getFunction(string,entity,effect){
    if(string === 'Venom Effect')
      return this.venomEffect(entity,effect);
    if (string === 'Bleed Effect')
      return this.bleedEffect(entity,effect);
    if(string === "Chicken Effect")
      return this.chickenEffect(entity,effect);
  }
}
