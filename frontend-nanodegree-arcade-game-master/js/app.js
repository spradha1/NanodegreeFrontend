// enemy class
class Enemy {
    /**
    * @constructor
    * @param {number} x - horizontal position of enemy
    * @param {number} y - vertical position of enemy
    * @param {number} speed - speed of enemy
    */
    constructor(x, y, speed) {
        this.x = x*Math.ceil(Math.random()*3);
        this.y = ((y%3)+1)*85 - 25;
        this.speed = Math.random()*100 + speed;
        // The image/sprite for our enemies 
        this.sprite = 'images/enemy-bug.png';
    }

    /**
    * @description updates the enemy's position
    * @param {number} dt - time delta between ticks
    */
    update(dt) {
        this.x += this.speed*dt;
        if (this.x>500) {
            this.x = -100;
            this.speed = Math.random()*200;
        }
    }

    /**
    * @description draw the enemy on the screen
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// player class
class Player {
    /**
    * @constructor
    * @param {number} x - horizontal position of player
    * @param {number} y - vertical position of player
    */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-princess-girl.png';
    }

    /**
    * @description updates the player's position and keeps it inbound
    */
    update() {
        if (this.x > 401)
            this.x -= 100;
        if (this.x < 0)
            this.x += 100;
        if (this.y > 401)
            this.y -= 82;
        if (this.y <= -10) {
            this.x = 200;
            this.y = 400;
            games.innerText = ++gamesWon;

            // implement animation on winning a game
            bodyTag.classList.add('win');
            setTimeout(function () {
                bodyTag.classList.remove('win');
            }, 800);
        }
    }       

    /**
    * @description draw the player on the screen
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
    * @description moves player on pressing arrow keys
    * @param {String} direction - direction for the player to move 
    */
    handleInput(direction) {
        switch (direction) {
            case 'left':
                this.x -= 100;
                break;
            case 'up':
                this.y -= 82;
                break;
            case 'down':
                this.y += 82;
                break;
            case 'right':
                this.x += 100;
                break;
        }
    }
}

/**
 * @description reloads page when reset button is clicked
 */
function refresh() {
    location.reload(true);
}

// instantiating all enemies and player
allEnemies = [];
for (let i=0; i<5; i++) {
    allEnemies.push(new Enemy(-100, i, 100));
}

player = new Player(200, 400);

// variables for score elements, body element and reset button
const games = document.querySelector(".games");
const death = document.querySelector(".deaths");
let gamesWon = 0;
let deaths = 0;
const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', refresh); 
const bodyTag = document.querySelector('body');

// This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
