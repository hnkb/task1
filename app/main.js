import { Map } from './model/map.js';
import { TaskList } from './model/task.js';
import { addToDOM } from './ui/map.js';

let map = new Map(30, 40);
map.load();

const taskList = new TaskList();

addToDOM(map, taskList);
