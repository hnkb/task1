
export class Task {
    constructor(name, row, col) {
        this.name = name;
        this.row = row;
        this.col = col;
    }
}

export class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
