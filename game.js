const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', createCardBoard);
const cardBoard = document.querySelector('.cardboard');
const showTurns = document.querySelector('.turns');
const cardboardSize = 8;
const cardboardContent = [];
const queue = [];
let turns = 0;


function shuffle() {
    cardboardContent.length = 0;
    turns = 0;
    showTurns.textContent = 0;
    for (let i = 1; i <= cardboardSize; i++) {
        cardboardContent.push(i, i);
    }
    cardboardContent.sort(() => Math.random() - 0.5)
}

function flip() {
    if (!this.classList.contains('flip')) {
        queue.push(this.classList[1]);
        turns += 1;
        showTurns.textContent = turns;
        if (turns > 1) checkFlip();
        this.classList.add('flip');
    }
}

function checkFlip() {
    if (queue[0] === queue[1]) { 
        document.querySelectorAll(`.${queue[0]}`).forEach(x => {
            x.classList.add('flip');
        })
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
    cardBoard.innerHTML = '';
    shuffle();
    cardboardContent.forEach(x => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`number-${x}`);
        card.innerHTML = x;
        cardBoard.append(card);
        card.addEventListener('click', flip);
    })
}