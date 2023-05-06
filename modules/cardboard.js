import state from './state.js';
import fillContent from './new-game-data.js';
import dancingButton from './start-button.js';
import flip from './flip.js';
import { cardBoard, showTurns, prevBest } from './selectors.js';

const toggleCardboard = () => {
  cardBoard.classList.toggle('cardboard-active');
  showTurns.classList.toggle('turns-active');
  prevBest.classList.toggle('prev-best-active');
};

const createCard = (el, cardboardSize, smile) => {
  const card = document.createElement('div');
  const className = smile ? `number-${el.slice(2, -1)}` : `number-${el}`;
  card.classList.add('card', className);
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  const cardSize = cardboardSize === 8 ? 22 : 14;
  card.setAttribute('style', `width: ${cardSize}%; padding: ${cardSize / 2}% 0`);
  cardContent.innerHTML = el;
  card.append(cardContent);
  cardBoard.append(card);
};

const updatePrevBest = (cardboardSize, smile) => {
  const key = smile ? `best-smile-${cardboardSize}` : `best-${cardboardSize}`;
  const prevBestValue = localStorage.getItem(key);
  if (prevBestValue) prevBest.textContent = `Previous best is ${prevBestValue}`;
};

const createCardboard = () => {
  const { cardboardSize, smile } = state;
  dancingButton();
  if (state.prevPlay) toggleCardboard();
  state.prevPlay = true;
  setTimeout(() => {
    toggleCardboard();
    cardBoard.innerHTML = '';
    const cardboardContent = fillContent();
    cardboardContent.forEach((el) => {
      createCard(el, cardboardSize, smile);
    });
    updatePrevBest(cardboardSize, smile);
    showTurns.textContent = 'Flips: 0';
  }, 300);
};

cardBoard.addEventListener('pointerup', (e) => flip(e));

export default createCardboard;
