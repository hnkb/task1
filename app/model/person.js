import { TaskList } from './task.js';

export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.row = 0;
        this.col = 0;
        this.taskList = new TaskList();
    }

    tick() {
        for (const task of this.taskList.tasks) {
            task.state = '';
        }

        if (this.taskList.tasks.length > 0) {
            const task = this.taskList.tasks[this.taskList.tasks.length - 1];
            task.state = 'active';
            this.row = task.row;
            this.col = task.col;
        }
    }
}
