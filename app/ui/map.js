
import { Task } from '../model/task.js';
import { updateTaskList } from './task.js';

export function addToDOM(map, taskList) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    let serial = 0;

    for (const row of map.cells) {
        const rowDOM = document.createElement('div');
        rowDOM.className = 'row';
        grid.appendChild(rowDOM);

        for (const cell of row) {
            const cellDOM = document.createElement('div');
            cellDOM.className = `cell ${cell.terrain}`;
            cellDOM.dataset.row = Math.floor(serial / map.width);
            cellDOM.dataset.col = serial % map.width;
            cellDOM.innerHTML = cell.resource ? `<img src="assets/${cell.resource}_${(serial % 9) + 1}.svg" />` : '';
            rowDOM.appendChild(cellDOM);

            serial++;
        }
    }

    document.body.appendChild(grid);

    grid.addEventListener('click', (event) => {
        const target = event.target.closest('.cell');
        if (target) {
            const r = target.dataset.row;
            const c = target.dataset.col;
            const cell = map.cells[r][c];
            console.log(target, cell);

            if (cell.terrain === 'grass') {
                taskList.addTask(new Task(cell.resource ? `Harvest ${cell.resource}` : 'Go to', r, c));
                updateTaskList(taskList);
            }
        }
    });
}
