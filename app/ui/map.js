
let grid = []

export function addToDOM(map) {
    const gridDOM = document.createElement('div');
    gridDOM.className = 'grid';

    let serial = 0;

    for (const row of map.cells) {
        const outRow = [];
        const rowDOM = document.createElement('div');
        rowDOM.className = 'row';
        gridDOM.appendChild(rowDOM);
        grid.push(outRow);

        for (const cell of row) {
            const cellDOM = document.createElement('div');
            cellDOM.className = `cell ${cell.terrain}`;
            cellDOM.innerHTML = cell.resource ? `<img src="assets/${cell.resource}_${(serial % 9) + 1}.svg" />` : '';
            rowDOM.appendChild(cellDOM);
            outRow.push(cellDOM);

            serial++;
        }
    }

    document.body.appendChild(gridDOM);
}
