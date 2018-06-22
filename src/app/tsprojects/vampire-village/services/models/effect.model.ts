export class Effect {

  name: string;
  type: string;
  effectVariable: number;
  duration: number;
  color: string;

  constructor(name, type, effectVariable, duration, color){
    this.name = name;
    this.type = type;
    this.effectVariable = effectVariable;
    this.duration = duration;
    this.color = color;
  }
}
