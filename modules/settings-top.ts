import state from './state.js';

const settingsBtn = document.querySelector('.settings-btn') as HTMLDivElement;
const settings = document.querySelector('.settings') as HTMLDivElement;
const topBtn = document.querySelector('.top-btn') as HTMLDivElement;
const topScore = document.querySelector('.top') as HTMLDivElement;

const showBest = () => {
  const best = ' best';
  const noBest = ' no record';
  const get = (key: string) => localStorage.getItem(key);
  const set = (selector: string, ls: string) => {
    const el = document.querySelector(selector)!.children[1];
    el.textContent = get(ls) ? `${best} ${get(ls)}` : noBest;
  };

  set('.four-num', 'best-8');
  set('.four-emo', 'best-smile-8');
  set('.six-num', 'best-18');
  set('.six-emo', 'best-smile-18');
};

const showSettings = (e: MouseEvent) => {
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
  if (!settings.contains(e.target as Node) && !topScore.contains(e.target as Node)) {
    settings.classList.remove('settings-active');
    topScore.classList.remove('settings-active');
  }
};

const numSmileSelect = () => {
  state.smile = !state.smile;
};

const fieldSelect = (e: MouseEvent) => {
  const size: string = (e.target as HTMLSelectElement)?.value;
  state.cardboardSize = (+size * +size) / 2;
};

const setListeners = () => {
  const radioSize = document.querySelectorAll('input[name=size]');
  radioSize.forEach((x) => x.addEventListener('click', (e) => fieldSelect(e as MouseEvent)));
  const radioContent = document.querySelectorAll('input[name=num-smile]');
  radioContent.forEach((x) => x.addEventListener('click', numSmileSelect));
  document.addEventListener('click', showSettings);
};

export default setListeners;
