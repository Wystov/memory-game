import state from './state.js';

const setBest = () => {
  const { smile, cardboardSize, turns } = state;
  const bestKey = smile ? `best-smile-${cardboardSize}` : `best-${cardboardSize}`;
  const best = localStorage.getItem(bestKey) || '999';
  if (!localStorage.getItem(bestKey) || turns < parseInt(best, 10)) {
    localStorage.setItem(bestKey, turns.toString());
  }
};

export default setBest;
