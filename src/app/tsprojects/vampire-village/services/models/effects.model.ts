import {Effect} from "./effect.model";

export class Effects {

  private weakVenomAttack: Effect = new Effect('poisoned','health',5,3,"#00ff00");
  private VenomAttack: Effect = new Effect('poisoned','health',10,3,"#00cc00");
  private strongVenomAttack: Effect = new Effect('poisoned','health',25,3,"#00aa00");
  private weakBleedEffect: Effect = new Effect('bleeding','health', 10,2,"#cc1111");
  private BleedEffect: Effect = new Effect('bleeding','health', 20,2,"#aa1111");

  constructor(){}

  getWeakVenomAttack(): Effect {return this.weakVenomAttack;}
  getVenomAttack(): Effect {return this.VenomAttack;}
  getStrongVenomAttack(): Effect {return this.strongVenomAttack;}
  getBleedEffect(): Effect {return this.weakBleedEffect;}
}
