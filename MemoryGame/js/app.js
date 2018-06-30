// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * @description turns clicked card face up
 * @param the click event
 */
function flip(evt) {
    const clicked = evt.target;

    // element clicked should not be a card that is already matched or the figure embedded in a card
    if (!clicked.classList.contains('match') && !clicked.classList.contains('fa')) {
        clicked.className = "card open show";

        // open no more than two cards at a time
        if (openCards.length < 2)
            openCards.push(clicked);

        // check for match if he same card was not clicked twice
        if (openCards.length > 1 && openCards[0] !== openCards[1])
            setTimeout(cardCheck, 275);
        else {
            while(openCards.length > 1)
                openCards.pop();
        }
    }
}

/*
 * @description checks if cards matched & updates game accordingly
 */
function cardCheck() {   
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className)
        this.match();
    else
        this.noMatch();
    while(openCards.length > 0)
        openCards.pop();
}

/*
 * @description locks matched cards in solvedCards
 */
function match() {
    this.updateGame();
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    solvedCards.push(openCards[0], openCards[1]);

    // game ends with all 16 cards matched
    if (solvedCards.length === 16)
        this.congratulate();
}

/*
 * @description flips open cards back to face down
 */
function noMatch() {
    this.updateGame();
    openCards[0].className = "card open show nomatch";
    openCards[1].className = "card open show nomatch";

    // temporary placement for non-matching cards to perform animations
    differentCards.push(openCards[0], openCards[1]);
    setTimeout(faceDown, 750);
}

/*
 * @description removes nomatch class after animation is done, reverts cards to face down
 */

function faceDown() {
    differentCards[0].className = "card";
    differentCards[1].className = "card";
    while(differentCards.length > 0)
        differentCards.pop();
}
/*
 * @description update details above the game grid
 */
function updateGame() {
    moves += 1;
    counter.textContent = moves;

    // rating drops at 13 & 25 moves
    if (moves == 13 || moves == 25)
        stars.lastElementChild.remove();
}

/*
 * @description refresh page
 * @param boolean determines that the page loads from the server
 */
function refresh() {
    location.reload(true);
}

/*
 * @description congratulates user after matching all cards
 */
function congratulate() {
    gameEnd = true;

    // clear page as game ends
    document.body.innerHTML = "";

    //construct congratulation message
    message = document.createElement('p');
    message.setAttribute('id', 'message');

    let finalStars = 3;
    if (moves > 24)
        finalStars = 1;
    else if (moves > 12)
        finalStars = 2;

    message.innerHTML = "Congratulations! You won!<br/>" + "Moves: " + moves + ", Stars: " + finalStars + ", Time: " + minutes + "m" + seconds + "s";
    document.body.appendChild(message);

    //construct "Play Again" button
    const playAgain = document.createElement('div');
    playAgain.textContent = "Play Again";
    playAgain.setAttribute('id', 'replay');
    playAgain.addEventListener('click', refresh);
    document.body.appendChild(playAgain);
}

/*
 * @description starts timer as the page loads
 */
document.addEventListener("DOMContentLoaded", function() {
    //function tick every second
    intervalId = setInterval(timer, 1000);

    function timer() {
        minutes = Math.floor(duration / 60);
        seconds = duration % 60;
        if (minutes < 10)
            minutes = "0" + minutes;
        if (seconds < 10)
            seconds = "0" + seconds;
        
        // stop timer function once game is over
        if (gameEnd)
            clearInterval(intervalId);
        else
            document.querySelector(".time").textContent = minutes + ":" + seconds;
        duration++;
    }
});

// list that holds all of the cards
const cards = document.querySelectorAll('.card');

let shuffledCards = [];
let deck = document.querySelector('.deck');
let gameEnd = false;

// for the timer function
let intervalId = 1;
let duration = 0;
let minutes = 0;
let seconds = 0;

// loop through each card and create its HTML, place in "shuffledCards"
cards.forEach(function(card, index){
    const newCard = document.createElement('li');
    newCard.className = card.className;
    newCard.innerHTML = card.innerHTML;
    shuffledCards[index] = newCard;
    card.remove();
});

// shuffle the cards
shuffledCards = this.shuffle(shuffledCards);

// card storage arrays for various purposes
let openCards = [];
let differentCards = [];
let solvedCards = [];

// game details: moves, stars
const counter = document.querySelector('.moves');
const stars = document.querySelector('.stars');
let moves = 0;

// event listeners for each of the card
for(let i=0; i<cards.length; i++){
    deck.appendChild(shuffledCards[i]);
    shuffledCards[i].addEventListener('click', flip);
}