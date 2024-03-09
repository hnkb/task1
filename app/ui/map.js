
let grid = []

export function addToDOM(map) {
    const gridDOM = document.createElement('div');
    gridDOM.className = 'grid';

    for (const row of map.cells) {
        const outRow = [];
        const rowDOM = document.createElement('div');
        rowDOM.className = 'row';
        gridDOM.appendChild(rowDOM);
        grid.push(outRow);

        for (const cell of row) {
            const cellDOM = document.createElement('div');
            cellDOM.className = `cell ${cell.terrain}`;
            cellDOM.innerHTML = cell.resource;
            rowDOM.appendChild(cellDOM);
            outRow.push(cellDOM);
        }
    }

    document.body.appendChild(gridDOM);
}
