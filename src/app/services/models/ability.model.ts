import {Effects} from "./effects.model";

export class Ability {

  name: string;
  damageMultiplier: number;
  description: string;
  effect: any;
  effectChance: number;
  cooldown: number;
  currentCooldown: number;

  constructor(name,description,damageMultiplier, effect, effectChance, cooldown){
    this.name = name;
    this.damageMultiplier = damageMultiplier;
    this.effect = effect;
    this.effectChance = effectChance;
    this.description = description;
    this.cooldown = cooldown;
    this.currentCooldown = 0;
  }
}
