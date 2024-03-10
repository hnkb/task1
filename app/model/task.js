
const TaskNames = {
    'extract': 'Harvest',
    'goto': 'Go to'
};

export class Task {
    constructor(type, row, col, cell) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.cell = cell;
        this.state = '';

        // if (type === 'extract' && !cell?.resource)
        //     throw new Error('Cannot extract from a cell without a resource');
        
        // create a user-friendly name for the task
        this.name = TaskNames[type];
        if (type === 'extract') this.name += ` ${cell.resource}`;
        if (cell) this.name += `${type === 'goto' ? '' : ' at'} (${row}, ${col})`;
    }

    allRequirementsAreMet() {
        if (this.type === 'extract' && !this.cell.resource)
            return false;
        return true;
    }

    tick(person, elapsed) {
        const task = this;

        if (task.state === 'done') return;

        // Step 1: move to location
        const travel = { x: task.col - person.col, y: task.row - person.row };
        if (Math.abs(travel.x) < 0.5 && Math.abs(travel.y) < 0.5) {
            task.state = 'doing';
            person.row = task.row;
            person.col = task.col;
        }
        else {
            task.state = 'moving';
            const norm = elapsed / Math.sqrt(travel.x * travel.x + travel.y * travel.y);
            person.row += travel.y * norm;
            person.col += travel.x * norm;
        }

        // Step 2: perform action
        if (task.state === 'doing') {
            switch (task.type) {
                case 'extract':
                    task.amount = Math.min(1, (task.amount || 0) + elapsed / 10);
                    if (task.amount === 1) {
                        task.state = 'done';
                        task.cell.resource = null;
                        // TODO: must update map
                    }
                    break;
                
                case 'goto':
                    task.state = 'done';
                    break;
            }
        }
    }
}

export class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(type, row, col, cell) {
        this.tasks.push(new Task(type, row, col, cell));
    }
}
