import state from './state.js';
import smileContent from './data.js';
import { prevBest } from './selectors.js';

const flip = () => {
  const { queue, cardboardSize, smile } = state;
  const cardboardContent = [];
  queue.length = 0;
  state.newGame();
  prevBest.innerHTML = '';
  for (let i = 1; i <= cardboardSize; i++) {
    const el = smile ? smileContent[i] : i;
    cardboardContent.push(el, el);
  }
  cardboardContent.sort(() => Math.random() - 0.5);
  return cardboardContent;
};

export default flip;
