const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', createCardBoard);
const cardBoard = document.querySelector('.cardboard');
const showTurns = document.querySelector('.turns');
const cardboardSize = 8;
const cardboardContent = [];
let lastOpen = 0;
let curOpen = 0;
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
    !lastOpen ? (curOpen = this.textContent, lastOpen = this.textContent) :
                (lastOpen = curOpen, curOpen = this.textContent);
    this.classList.add('flip');
    turns += 1;
    showTurns.textContent = turns;
    if (lastOpen === curOpen && turns > 1) { 
        document.querySelectorAll(`number-${lastOpen}`).forEach(x => {
            x.classList.add('flip');
        })
    } else {
        setTimeout(() => {
            this.classList.remove('flip')
        }, 1500)
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