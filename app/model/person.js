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
        if (task)
            task.tick(this, elapsed);
    }

    #pickTask() {
        const pending = this.taskList.tasks.filter(task => task.state !== 'done');

        for (const task of pending) {
            task.state = '';
        }
    
        for (const task of pending) {
            if (task.allRequirementsAreMet()) {
                return task;
            }
            else {
                task.state = 'impossible';
            }
        }

        return null;
    }
}
