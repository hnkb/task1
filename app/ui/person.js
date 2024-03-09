
let sprite;
let gridSizing = { offset: { x: 8, y: 8 }, size: { x: 21, y: 21 } };

export function drawPerson(person) {
    if (!sprite) {
        sprite = document.createElement('img');
        sprite.src = 'assets/woman.svg';
        sprite.className = 'person';
        document.body.appendChild(sprite);

        // const grid = document.querySelector('.grid');
        // if (grid) {
        //     gridSizing.offset.x = grid.offsetLeft + 3;
        //     gridSizing.offset.y = grid.offsetTop;
        //     gridSizing.size.x = grid.offsetWidth / map.width;
        //     gridSizing.size.y = grid.offsetHeight / map.height;
        // }
    }

    sprite.style.top = (gridSizing.offset.y + person.row * gridSizing.size.y) + 'px';
    sprite.style.left = (gridSizing.offset.x + person.col * gridSizing.size.x) + 'px';
}
