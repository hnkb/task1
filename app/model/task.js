
export class Task {
    constructor(name, row, col) {
        this.name = name;
        this.row = row;
        this.col = col;
        this.state = '';
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
