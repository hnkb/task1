import { TaskList } from './task.js';

export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.row = 0;
        this.col = 0;
        this.taskList = new TaskList();
    }

    tick(elapsed) {
        const task = this.#pickTask();
        if (task) {
            const travel = { x: task.col - this.col, y: task.row - this.row };

            if (Math.abs(travel.x) < 0.5 && Math.abs(travel.y) < 0.5) {
                task.state = 'done';
                this.row = task.row;
                this.col = task.col;
            }
            else {
                task.state = 'active';

                const norm = elapsed / Math.sqrt(travel.x * travel.x + travel.y * travel.y);
                this.row += travel.y * norm;
                this.col += travel.x * norm;
            }
        }
    }

    #pickTask() {
        const pending = this.taskList.tasks.filter(task => task.state !== 'done');

        for (const task of pending) {
            task.state = '';
        }
    
        for (const task of pending) {
            // if (allRequirementsAreMet(task)) {
                return task;
            // }
            // else {
            //     task.state = 'impossible';
            // }
        }

        return null;
    }
}
