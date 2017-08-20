/**
 * The GameModel is the class that is responsible for
 * storing the positions of the hero and food sprites,
 * checking the win condition,
 * and reporting the score.
 */
function GameModel() {

    this.xmax = 480; // maximum x value of background image
    this.ymax = 480; // maximum y value of background image
    this._foodSpriteWidth = 35;
    this._foodSpriteHeight = 40;

    this._foodSprites = [];
    var sprite1 = new Sprite(this)
    this._foodSprites.push(sprite1);
}

function Sprite(model) {
    types = ['APPLE', 'CHEESE', 'LEMON', 'CARROT', 'PIZZA', 'GRAPES']
    this.type = types[randomIntFromInterval(0, types.length)];
    this.x = randomIntFromInterval(0, model.xmax - model._foodSpriteWidth);
    this.y = 0;
    this.speed = 10;  // pixels per frame
}

_s = Sprite.prototype;

_s.initialiseSprite = function() {
    this.type = types[randomIntFromInterval(0, 5)];
    this.x = randomIntFromInterval(0, 300);
    this.y = 0;
};

_p = GameModel.prototype;

_p.reset = function() {
    console.log('reset');
    for (i = 0; i < this._foodSprites.length; i++) {
        this._foodSprites[i].y += this._foodSprites[i].speed;
        // if sprite has fallen to bottom, re-initialise it
        if (this._foodSprites[i].y > (this.ymax - this._foodSpriteHeight)) {
            this._foodSprites[i].initialiseSprite();
        }
    }
};
