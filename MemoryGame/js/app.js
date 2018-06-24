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
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        this.match();
    }
    else {
        this.noMatch();
    }
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
    if (solvedCards.length === 16) {
        this.congratulate();
    }
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
    location.assign("congratulation.html");
}

/*
 * @description starts timer as the page loads
 */
document.addEventListener("DOMContentLoaded", function() {
    setInterval(timer, 1000);
    let duration = 0;
    function timer() {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;
        if (minutes < 10)
            minutes = "0" + minutes;
        if (seconds < 10)
            seconds = "0" + seconds;
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */