import { Attack } from "./attack";

export class Selector {
  constructor(canvas) {
    // basic selector 
    this.canvas = canvas;
    this.radius = 30;
    this.attacked = false;
    
    // planets
    this.firstPlanet = undefined;
    this.secondPlanet = undefined;
    
    // planets pos
    this.defaultPos = [-100,-100];
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
  }
  
  setFirstTarget(planet) {
    this.firstPos = [planet.pos[0]+this.radius, planet.pos[1]+this.radius];
    this.firstPlanet = planet;
  }
  
  setSecondTarget(planet) {
    this.secondPos = [planet.pos[0]+this.radius, planet.pos[1]+this.radius];
    this.secondPlanet = planet;
  }
  
  defaultTargets() {
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
    this.firstPlanet = undefined;
    this.secondPlanet = undefined;
    this.attacked = false;
  }

  draw(ctx) {
    if (this.secondPos != this.defaultPos && this.secondPlanet != this.firstPlanet) {
      // ctx.strokeStyle = this.firstPlanet.color;
      // ctx.beginPath();
      // ctx.moveTo(...this.firstPos);
      // ctx.lineTo(...this.secondPos);
      // ctx.closePath();
      // ctx.stroke();
      if (this.attacked == false) {
        this.firstPlanet.attack(this.secondPlanet);
        this.attacked = true;
      }
    }
  }
}