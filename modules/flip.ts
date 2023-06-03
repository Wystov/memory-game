import state from './state.js';
import { showTurns } from './selectors.js';
import setBest from './best-score.js';

const checkFlip = () => {
  const { queue, cardboardSize, turns } = state;
  const [firstCard, secondCard] = queue;
  if (firstCard === secondCard) {
    document.querySelectorAll(`.${firstCard}`).forEach((card) => {
      card.classList.add('flip', 'match');
    });
    state.match += 2;
    queue.length = 0;
    if (state.match === cardboardSize * 2) {
      showTurns.textContent = `WIN IN ${turns} FLIPS!`;
      setBest();
    }
  } else if (queue.length > 2) {
    document.querySelectorAll(`.${firstCard}, .${secondCard}`).forEach((card) => {
      card.classList.remove('flip');
    });
    queue.shift();
    queue.shift();
  }
};

const flip = (e: MouseEvent): void => {
  const card = (e.target as HTMLElement).closest('.card') as HTMLElement;
  if (card === null) return;
  if (!card.classList.contains('flip')) {
    state.queue.push(card.classList[1]);
    state.turns += 1;
    showTurns.textContent = `Flips: ${state.turns}`;
    if (state.turns > 1) checkFlip();
    card.classList.add('flip');
  }
};

export default flip;
