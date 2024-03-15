
class Task {
    constructor(row, col, cell) {
        this.row = row;
        this.col = col;
        this.cell = cell;
        this.state = '';
        this.name = `Go to (${row}, ${col})`;
        this.person = null;
    }

    allRequirementsAreMet() {
        return true;
    }

    action(elapsed) {
        this.state = 'done';
    }

    tick(elapsed) {
        const task = this;
        const person = this.person;

        if (task.state === 'done') return;
        if (!person) throw new Error('Task started without a person doing it!');

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

        if (task.state === 'doing')
            task.action(elapsed);
    }
}

class ExtractTask extends Task {
    constructor(row, col, cell) {
        super(row, col, cell);
        this.name = `Harvest ${cell.resource} at (${row}, ${col})`;
    }

    allRequirementsAreMet() {
        return this.cell.resource === 'tree' || this.cell.resource === 'rock';
    }

    action(elapsed) {
        this.amount = (this.amount || 0) + elapsed / 10;
        if (this.amount >= 1) {
            this.state = 'done';
            this.cell.resource = this.cell.resource === 'tree' ? 'wood' : 'stone';
        }
    }
}

export class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(type, row, col, cell) {
        if (type === 'extract') {
            if (!cell?.resource)
                throw new Error('Cannot extract from a cell without a resource');
            this.tasks.push(new ExtractTask(row, col, cell));
        }
        else if (type === 'goto')
            this.tasks.push(new Task(row, col, cell));
        else
            throw new Error(`Unknown task type: ${type}`);
    }

    pickTask() {
        const pending = this.tasks.filter(task => task.state !== 'done' && task.person === null);

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
