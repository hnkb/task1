import { Map } from './model/map.js';
import { Person } from './model/person.js';
import { addToDOM, drawPerson, updateTaskList, setupTimer } from './ui/index.js';

const map = new Map(30, 40);
map.load();

const eve = new Person('Eve', 20);

const updateUI = () => {
    drawPerson(eve);
    updateTaskList(eve.taskList);
};

addToDOM(map, eve.taskList, updateUI);
setupTimer(elapsed => {
    eve.tick(elapsed);
    updateUI();
});
