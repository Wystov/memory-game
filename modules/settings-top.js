import state from './state.js';

const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const topBtn = document.querySelector('.top-btn');
const topScore = document.querySelector('.top');

const showBest = () => {
  const best = ' best';
  const noBest = ' no record';
  const get = (key) => localStorage.getItem(key);
  const set = (selector, ls) => {
    const el = document.querySelector(selector).children[1];
    el.textContent = get(ls) ? `${best} ${get(ls)}` : noBest;
  };

  set('.four-num', 'best-8');
  set('.four-emo', 'best-smile-8');
  set('.six-num', 'best-18');
  set('.six-emo', 'best-smile-18');
};

const showSettings = (e) => {
  if (e.target === settingsBtn) {
    settings.classList.toggle('settings-active');
    topScore.classList.remove('settings-active');
    return;
  }
  if (e.target === topBtn) {
    showBest();
    topScore.classList.toggle('settings-active');
    settings.classList.remove('settings-active');
    return;
  }
  if (!settings.contains(e.target) && !topScore.contains(e.target)) {
    settings.classList.remove('settings-active');
    topScore.classList.remove('settings-active');
  }
};

const numSmileSelect = () => {
  state.smile = !state.smile;
};

const fieldSelect = (e) => {
  const size = e.target.value;
  state.cardboardSize = (size * size) / 2;
};

const setListeners = () => {
  const radioSize = document.querySelectorAll('input[name=size]');
  radioSize.forEach((x) => x.addEventListener('click', (e) => fieldSelect(e)));
  const radioContent = document.querySelectorAll('input[name=num-smile]');
  radioContent.forEach((x) => x.addEventListener('click', numSmileSelect));
  document.addEventListener('click', showSettings);
};

export default setListeners;
