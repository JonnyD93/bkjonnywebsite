export class Effect {
  name: string;
  type: string;
  effectVariable: number;
  duration: number;

  constructor(name, type, effectVariable, duration){
    this.name = name;
    this.type = type;
    this.effectVariable = effectVariable;
    this.duration = duration;
  }
}
