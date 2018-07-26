// enemy class
class Enemy {
    /**
    * @constructor
    * @param {number} x - horizontal position of enemy
    * @param {number} y - vertical position of enemy
    * @param {number} speed - speed of enemy
    */
    constructor(x, y, speed) {
        this.x = x*100;
        this.y = Math.floor(Math.random()*3);
        this.speed = Math.random()*25;
        // The image/sprite for our enemies 
        this.sprite = 'images/enemy-bug.png';
    }

    /**
    * @description updates the enemy's position
    * @param {number} dt - time delta between ticks
    */
    update(dt) {
        this.x += this.speed*dt;
        if (x>600)
            x = 100;
    }

    /**
    * @description draw the enemy on the screen, required method for game
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
        this.sprite = 'images/char-pink-girl.png';
    }

    /**
    * @description updates the player's position
    */
    update() {
        if (this.x - player.x <= 25 && this.y - player.y <= 25) {
            this.x = 500;
            this.y = 700;
        }
    }

    /**
    * @description moves player on pressing arrow keys
    * @param {String} direction - direction for the player to move 
    */
    handleInput(direction) {
        switch (direction) {
            case 'left':
                this.x -= 100;
            case 'up':
                this.y -= 100;
            case 'down':
                this.y += 100;
            case 'right':
                this.x += 100;
        }
    }
}

// instantiating all enemies and player
allEnemies = [];
for (let i=0; i<3; i++) {
    allEnemies.push(new Enemy(10, 10, 10));
}

player = new Player(200, 500);

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
