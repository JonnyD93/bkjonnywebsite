import {Effect} from "./effect.model";

export class Effects {

  private weakVenomAttack: Effect = new Effect('VenomEffect','health',5,3);
  private VenomAttack: Effect = new Effect('VenomEffect','health',10,3);
  private strongVenomAttack: Effect = new Effect('VenomEffect','health',25,3);

  constructor(){}

  getWeakVenomAttack(): Effect {return this.weakVenomAttack;}
  getVenomAttack(): Effect {return this.VenomAttack;}
  getStrongVenomAttack(): Effect {return this.strongVenomAttack;}
}
