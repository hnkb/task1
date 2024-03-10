
class Cell {
    terrain = 'grass';
    _resource = null;

    constructor(world) {
        this.world = world;
    }

    get resource() {
        return this._resource;
    }

    set resource(value) {
        this._resource = value;
        this.world.dirtyCells.push(this);
    }
}

let seed = 1234;
function seededRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export class Map {
    constructor(world, height, width) {
        this.height = height;
        this.width = width;
        this.cells = [];

        for (let r = 0; r < this.height; r++) {
            this.cells[r] = [];
            for (let c = 0; c < this.width; c++) {
                this.cells[r][c] = new Cell(world);
            }
        }
    }

    load() {
        const lakeCenterX = this.width - 10;
        const lakeCenterY = 5;
        const lakeRadius = 5;
  
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[y][x];
                const distanceToLakeCenter = Math.sqrt(Math.pow(x - lakeCenterX, 2) + Math.pow(y - lakeCenterY, 2));
                if (distanceToLakeCenter < lakeRadius) {
                    cell.terrain = "water";
                } else {
                    // Optionally add resources to some grass cells
                    const resourceChance = seededRandom();// Math.random();
                    if (resourceChance > 0.95) {
                        cell.resource = "rock";
                    } else if (resourceChance > 0.9) {
                        cell.resource = "tree";
                    }
                }
            }
        }
    }
}
