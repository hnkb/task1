import { Map } from './model/map.js';
import { addToDOM } from './ui/map.js';

let map = new Map(30, 40);
map.load();

addToDOM(map);
