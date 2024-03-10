import { Map } from './map.js';
import { Person } from './person.js';

export class World {
    constructor() {
        this.map = new Map(30, 40);
        this.map.load();

        this.people = [new Person('Eve', 20)];
    }

    tick(elapsed) {
        for (const person of this.people)
            person.tick(elapsed);
    }
}
