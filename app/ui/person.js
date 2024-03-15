
const spriteMap = new Map();

export function drawPerson(person, ui) {
    if (!spriteMap.has(person)) {
        const sprite = document.createElement('img');
        sprite.src = `assets/${person.gender}.svg`;
        sprite.className = 'person';
        sprite.title = person.name;
        document.body.appendChild(sprite);
        spriteMap.set(person, sprite);
    }

    const sprite = spriteMap.get(person);
    sprite.style.top = (ui.gridSizing.offset.y + person.row * ui.gridSizing.size.y) + 'px';
    sprite.style.left = (ui.gridSizing.offset.x + person.col * ui.gridSizing.size.x) + 'px';
}
