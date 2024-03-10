
class Task {
    constructor(row, col, cell) {
        this.row = row;
        this.col = col;
        this.cell = cell;
        this.state = '';
        this.name = `Go to (${row}, ${col})`;
    }

    allRequirementsAreMet() {
        return true;
    }

    action(person, elapsed) {
        this.state = 'done';
    }

    tick(person, elapsed) {
        const task = this;

        if (task.state === 'done') return;

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
            task.action(person, elapsed);
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

    action(person, elapsed) {
        this.amount = (this.amount || 0) + elapsed / 10;
        if (this.amount >= 1) {
            this.state = 'done';
            this.cell.resource = null;
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
}
