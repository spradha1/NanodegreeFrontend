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
 * @description turns over card that was clicked
 * @param the click event
 */
function flip(evt) {
    const clicked = evt.target;
    if (!clicked.classList.contains('match') && !clicked.classList.contains('fa')) {
        clicked.className = "card open show";
        openCards.push(clicked);
        if (openCards.length > 1 && openCards[0] !== openCards[1])
            cardCheck();
        else {
            while(openCards.length > 1)
                openCards.pop();
        }
    }
}

/*
 * @description checks if cards matched, if the game ended & updates game accordingly
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
    if (solvedCards.length === 16)
        this.congratulate();
}

/*
 * @description flips open cards back to face down
 */
function noMatch() {
    this.updateGame();
    openCards[0].className = "card";
    openCards[1].className = "card";
}

/*
 * @description update details above the game grid
 */
function updateGame() {
    moves += 1;
    counter.textContent = moves;
    if (moves == 20)
        stars.children[1].firstElementChild.className = 'far fa-star';
    else if (moves == 10)
        stars.children[2].firstElementChild.className = 'far fa-star';
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
    document.body.innerHTML = "";

    message = document.createElement('p');
    message.setAttribute('id', 'message');

    let finalStars = 3;
    if (moves > 19)
        finalStars = 1;
    else if (moves > 9)
        finalStars = 2;

    message.innerHTML = "Congratulations! You won!<br/>" + "Moves: " + moves + ", Stars: " + finalStars + ", Time: " + minutes + "m" + seconds + "s";
    document.body.appendChild(message);

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
    intervalId = setInterval(timer, 1000);
    function timer() {
        minutes = Math.floor(duration / 60);
        seconds = duration % 60;
        if (minutes < 10)
            minutes = "0" + minutes;
        if (seconds < 10)
            seconds = "0" + seconds;
        if (gameEnd)
            clearInterval(intervalId);
        else
            document.querySelector(".time").textContent = minutes + ":" + seconds;
        duration++;
    }
});


// list that holds all of the cards
const cards = document.querySelectorAll('.card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let shuffledCards = [];
let deck = document.querySelector('.deck');
let gameEnd = false;
let intervalId = 1;
let duration = 0;
let minutes = 0;
let seconds = 0;

cards.forEach(function(card, index){
    const newCard = document.createElement('li');
    newCard.className = card.className;
    newCard.innerHTML = card.innerHTML;
    shuffledCards[index] = newCard;
    card.remove();
});

shuffledCards = this.shuffle(shuffledCards);
let openCards = [];
let solvedCards = [];
const counter = document.querySelector('.moves');
const stars = document.querySelector('.stars');
let moves = 0;

for(let i=0; i<cards.length; i++){
    deck.appendChild(shuffledCards[i]);
    shuffledCards[i].addEventListener('click', flip);
}