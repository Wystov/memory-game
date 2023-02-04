const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', createCardBoard);
startBtn.addEventListener('click', dancingButton);
const cardBoard = document.querySelector('.cardboard');
const showTurns = document.querySelector('.turns');
const radioSize = document.querySelectorAll('input[name=size]');
const prevBest = document.querySelector('.prev-best');
radioSize.forEach(x => x.addEventListener('click', fieldSelect));
const radioContent = document.querySelectorAll('input[name=num-smile]');
radioContent.forEach(x => x.addEventListener('click', numSmileSelect))
let cardboardSize = 8;
const cardboardContent = [];
const smileContent = ['&#128512;', '&#128513;', '&#128511;', '&#128509;',
                      '&#128508;', '&#129409;', '&#9924;', '&#127752;',
                      '&#127774;', '&#129430;', '&#127775;', '&#127789;',
                      '&#127796;', '&#127797;', '&#127803;', '&#127817;',
                      '&#128081;', '&#128110;']
const queue = [];
let turns = 0;
let match = 0;
let rotation = 360;
let smile = 0;

function dancingButton() {
    startBtn.style = `transform: rotate(${rotation}deg)`;
    rotation += 360;
}

function shuffle() {
    cardboardContent.length = 0;
    queue.length = 0;
    turns = 0;
    match = 0;
    prevBest.textContent = "\u00A0";
    if (smile) {
        for (let i = 0; i < cardboardSize; i++){
            cardboardContent.push(smileContent[i], smileContent[i]);
        }
    } else { 
        for (let i = 1; i <= cardboardSize; i++) {
            cardboardContent.push(i, i);
        }
    }
    cardboardContent.sort(() => Math.random() - 0.5)
}

function flip() {
    if (!this.classList.contains('flip')) {
        queue.push(this.classList[1]);
        turns += 1;
        showTurns.textContent = `Flips: ${turns}`;
        if (turns > 1) checkFlip();
        this.classList.add('flip');
    }
}

function checkFlip() {
    if (queue[0] === queue[1]) { 
        document.querySelectorAll(`.${queue[0]}`).forEach(x => {
            x.classList.add('flip', 'match')});
        match += 2;
        if (match === cardboardSize * 2) {
            showTurns.textContent = `WIN IN ${turns} FLIPS!`;
            let best;
            if (smile) {
                best = localStorage.getItem(`best-smile-${cardboardSize}`) || 999;
            } else {
                best = localStorage.getItem(`best-${cardboardSize}`) || 999;
            }
            if (smile) {
                if (!localStorage.getItem(`best-smile-${cardboardSize}`) || turns < best) {
                    localStorage.setItem(`best-smile-${cardboardSize}`, turns);
                } 
            } else {
                if (!localStorage.getItem(`best-${cardboardSize}`) || turns < best) {
                    localStorage.setItem(`best-${cardboardSize}`, turns);
                }
            }
        }
        queue.shift();
        queue.shift();
    }
    if (queue[0] !== queue[1] && queue.length > 2) {
        document.querySelectorAll(`.${queue[1]}`).forEach(x => {
            x.classList.remove('flip');
        });
        document.querySelectorAll(`.${queue[0]}`).forEach(x => {
            x.classList.remove('flip');
        });
        queue.shift();
        queue.shift();
    }
}



function createCardBoard() {
    cardBoard.classList.remove('cardboard-active');
    showTurns.classList.remove('turns-active');
    prevBest.classList.remove('prev-best-active');
    setTimeout(() => {
        cardBoard.classList.add('cardboard-active');
        cardBoard.innerHTML = '';
        shuffle();
        cardboardContent.forEach(x => {
            const card = document.createElement('div');
            const content = document.createElement('div');
            card.classList.add('card');
            content.classList.add('card-content');
            if (smile) {
                card.classList.add(`number-${x.slice(2, -1)}`)
            } else {
                card.classList.add(`number-${x}`);
            }
            const cardSize = cardboardSize === 8 ? 22 : 14;
            card.setAttribute('style', `width: ${cardSize}%; padding: ${cardSize / 2}% 0`);
            content.innerHTML = x;
            cardBoard.append(card);
            card.append(content);
            card.addEventListener('click', flip);
            showTurns.classList.add('turns-active');
            prevBest.classList.add('prev-best-active');
            if (smile) {
                if (localStorage.getItem(`best-smile-${cardboardSize}`)) {
                    prevBest.textContent = `Previous best is ${localStorage.getItem(`best-smile-${cardboardSize}`)}`;
                }
            } else if (localStorage.getItem(`best-${cardboardSize}`)) {
                prevBest.textContent = `Previous best is ${localStorage.getItem(`best-${cardboardSize}`)}`;
            }
            });
            showTurns.textContent = `Flips: ${turns}`;
    }, 300);
}

function fieldSelect() {
    cardboardSize = this.value * this.value / 2;
}

function numSmileSelect() {
    this.value === 'num' ? smile = 0 : smile = 1;
}

const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const topBtn = document.querySelector('.top-btn');
const topScore = document.querySelector('.top');
const icons = document.querySelector('.icons');
document.addEventListener('click', showSettings);

function showSettings() {
    if (!icons.contains(event.target)) {
        settings.classList.remove('settings-active');
        topScore.classList.remove('settings-active');
    }
    if (event.target === settingsBtn) {
        settings.classList.toggle('settings-active');
        topScore.classList.remove('settings-active');

    }
    if (event.target === topBtn) {
        topScore.classList.toggle('settings-active');
        settings.classList.remove('settings-active');
    }
}