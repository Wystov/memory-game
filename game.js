const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', createCardBoard);
startBtn.addEventListener('click', dancingButton);
const cardBoard = document.querySelector('.cardboard');
const showTurns = document.querySelector('.turns');
const radio = document.querySelectorAll('input[name=size]');
const prevBest = document.querySelector('.prev-best');
radio.forEach(x => x.addEventListener('click', fieldSelect));
let cardboardSize = 8;
const cardboardContent = [];
const queue = [];
let turns = 0;
let match = 0;
let rotation = 360;

function dancingButton() {
    startBtn.style = `transform: rotate(${rotation}deg)`;
    rotation += 360;
}

function shuffle() {
    cardboardContent.length = 0;
    turns = 0;
    match = 0;
    prevBest.textContent = "\u00A0";
    for (let i = 1; i <= cardboardSize; i++) {
        cardboardContent.push(i, i);
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
            let best = localStorage.getItem(`best-${cardboardSize}`) || 999;
            if (!localStorage.getItem(`best-${cardboardSize}`) || turns < best) {
                localStorage.setItem(`best-${cardboardSize}`, turns);
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
            card.classList.add('card');
            card.classList.add(`number-${x}`);
            const cardSize = cardboardSize === 8 ? 22 : 14;
            card.setAttribute('style', `width: ${cardSize}%; padding: ${cardSize / 2}% 0`);
            card.innerHTML = x;
            cardBoard.append(card);
            card.addEventListener('click', flip);
            showTurns.classList.add('turns-active');
            prevBest.classList.add('prev-best-active');
            if (localStorage.getItem(`best-${cardboardSize}`)) {
                prevBest.textContent = `Previous best is ${localStorage.getItem(`best-${cardboardSize}`)}`;
            }
            showTurns.textContent = `Flips: ${turns}`;
            })
    }, 300);

    
}

function fieldSelect() {
    cardboardSize = this.value * this.value / 2;
}