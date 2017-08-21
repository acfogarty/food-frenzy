/**
 * The GameModel is the class that is responsible for
 * storing the positions of the hero and food sprites,
 * checking the win condition,
 * and reporting the score.
 */
function GameModel() {

    this.xmax = 480; // maximum x value of background image
    this.ymax = 480; // maximum y value of background image
    this.heroSpriteHeight = 64;
    this.heroSpriteWidth = 64;
    this.foodSpriteWidth = 35;
    this.foodSpriteHeight = 40;

    this.winPadding = 32; // food and hero must be closer than this distance to eat

    this.score = 0;
    this.weight = 0;

    this.foodSprites = [];
    var sprite1 = new Sprite(this);
    this.foodSprites.push(sprite1);

    this.hero = new Hero(this);
}

p = GameModel.prototype;

p.reset = function() {

    var scoreIncrement = 5; // TODO do better

    // food sprites fall automatically
    for (var i = 0; i < this.foodSprites.length; i++) {

        // check if hero eats food
        var xDiff = Math.abs(this.hero.x - this.foodSprites[i].x);
        var yDiff = Math.abs(this.hero.y - this.foodSprites[i].y);
        if ((xDiff < this.winPadding) && (yDiff < this.winPadding)) {
            console.log(this.foodSprites[i].foodGroup);
            if (this.foodSprites[i].foodGroup == 'GOOD') {
                this.score += scoreIncrement;
            } else if (this.foodSprites[i].foodGroup == 'BAD') {
                this.weight += scoreIncrement;
            } else {
                console.log('food group unknown');
            }
            this.foodSprites[i].initialiseSprite();
            document.getElementById("scoreValue").innerHTML = this.score;
            document.getElementById("weightValue").innerHTML = this.weight;
        }

        this.foodSprites[i].y += this.foodSprites[i].speed;

        // if sprite has fallen to bottom, re-initialise it
        if (this.foodSprites[i].y > (this.ymax - this.foodSpriteHeight)) {
            this.foodSprites[i].initialiseSprite();
        }
    }

    // hero sprite is moved via keyboard
    this.hero.velocity = 0; // no acceleration
    if (37 in keysDown) { // left arrow
        this.hero.velocity = this.hero.speed * -1;
    }
    if (39 in keysDown) { // right arrow
        this.hero.velocity = this.hero.speed;
    }
    this.hero.x += this.hero.velocity;
    // hero cannot leave game, no PBC
    if (this.hero.x < 0) {
        this.hero.x = 0;
    }
    if (this.hero.x > (this.xmax - this.heroSpriteWidth)) {
        this.hero.x = this.xmax - this.heroSpriteWidth;
    }

};

function Sprite(model) {
    // TODO use function initialiseSprite
    this.type = types[randomIntFromInterval(0, types.length)];
    this.foodGroup = foodGroups[this.type];
    this.x = randomIntFromInterval(0, model.xmax - model.foodSpriteWidth);
    this.y = 0;
    this.speed = 10;  // pixels per frame
}

s = Sprite.prototype;

s.initialiseSprite = function() {
    this.type = types[randomIntFromInterval(0, 5)];
    this.foodGroup = foodGroups[this.type];
    this.x = randomIntFromInterval(0, 300);
    this.y = 0;
};

function Hero(model) {
    this.x = model.xmax / 2;
    this.y = model.ymax - model.heroSpriteHeight;
    this.speed = 10; // pixels per frame (speed if moving)
    this.velocity = 0;
}
