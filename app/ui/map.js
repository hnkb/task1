
export function drawMap(ui) {
    const map = ui.world.map;

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
            const r = parseInt(target.dataset.row);
            const c = parseInt(target.dataset.col);
            const cell = map.cells[r][c];
            // console.log(target, cell);

            if (cell.terrain === 'grass') {
                ui.eve.taskList.addTask(cell.resource ? 'extract' : 'goto', r, c, cell);
                ui.update();
            }
        }
    });

    // return { offset: { x: grid.offsetLeft, y: grid.offsetTop }, size: { x: grid.offsetWidth / map.width, y: grid.offsetHeight / map.height } };
}
