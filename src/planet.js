import { MovingObject } from "./moving_object";

class Planet extends MovingObject {
    constructor(owner) {
        this.owner = owner;
        this.color = owner.color;
        this.cap = owner.cap;
        this.rate = owner.rate;
    }
}