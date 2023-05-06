import createCardboard from './modules/cardboard.js';
import { startBtn } from './modules/selectors.js';
import setListeners from './modules/settings-top.js';

startBtn.addEventListener('click', createCardboard);
setListeners();
