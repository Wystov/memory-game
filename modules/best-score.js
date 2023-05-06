import state from './state.js';

const setBest = () => {
  const { smile, cardboardSize, turns } = state;
  const bestKey = smile ? `best-smile-${cardboardSize}` : `best-${cardboardSize}`;
  const best = localStorage.getItem(bestKey) || 999;
  if (!localStorage.getItem(bestKey) || turns < best) {
    localStorage.setItem(bestKey, turns);
  }
};

export default setBest;
