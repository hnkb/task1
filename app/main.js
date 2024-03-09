import { Map } from './model/map.js';
import { Person } from './model/person.js';
import { addToDOM } from './ui/map.js';
import { drawPerson } from './ui/person.js';
import { updateTaskList } from './ui/task.js';

const map = new Map(30, 40);
map.load();

const eve = new Person('Eve', 20);

const updateUI = () => {
    eve.tick();
    drawPerson(eve);
    updateTaskList(eve.taskList);
};

addToDOM(map, eve.taskList, updateUI);
updateUI();
