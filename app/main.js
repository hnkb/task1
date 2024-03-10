import { World } from './model/world.js';
import { UserInterface } from './ui/ui.js';

const world = new World();
const ui = new UserInterface(world);
ui.start();
