
import { drawMap } from './map.js';
import { drawPerson } from './person.js';
import { updateTaskList } from './task.js';
import { setupTimer } from './tick.js';

export class UserInterface {
    gridSizing = { offset: { x: 8, y: 8 }, size: { x: 21, y: 21 } };

    constructor(world) {
        this.world = world;
        this.eve = world.people[0];
    }

    start() {
        this.gridSizing = drawMap(this);
        setupTimer(this);
        this.update();
    }

    update() {
        for (const person of this.world.people)
            drawPerson(person, this);
        updateTaskList(this.eve.taskList);
    }
}
