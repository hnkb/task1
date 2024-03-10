
import { drawMap } from './map.js';
import { drawPerson } from './person.js';
import { updateTaskList } from './task.js';
import { setupTimer } from './tick.js';

export class UserInterface {
    constructor(world) {
        this.world = world;
        this.eve = world.people[0];
    }

    start() {
        drawMap(this);
        setupTimer(this);
        this.update();
    }

    update() {
        for (const person of this.world.people)
            drawPerson(person);
        updateTaskList(this.eve.taskList);
    }
}
