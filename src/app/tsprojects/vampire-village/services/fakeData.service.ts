import { Injectable } from '@angular/core';
import {Ability} from "./models/ability.model";
import {Effects} from "./models/effects.model";
import {AbilitiesService} from './abilities.service';

@Injectable()
export class FakeDataService {
  users: any[];
  PlayerData: { level: number, experience: number, inventory: any[], characters: any[]};
  constructor(private abilitiesService: AbilitiesService) {
  }

}
