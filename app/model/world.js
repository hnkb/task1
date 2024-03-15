import { Map } from './map.js';
import { Person } from './person.js';
import { TaskList } from './task.js';

export class World {
    dirtyCells = [];
    
    constructor() {
        this.map = new Map(this, 30, 40);
        this.map.load();

        this.taskList = new TaskList();

        this.people = [new Person('Eve', 20, this)];
        this.people.push(new Person('Adam', 20, this));
    }

    tick(elapsed) {
        for (const person of this.people)
            person.tick(elapsed);
    }
}
