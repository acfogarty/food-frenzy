/**
 * The GameModel is the class that is responsible for
 * storing the positions of the hero and food sprites,
 * checking the win condition,
 * and reporting the score.
 */
function GameModel() {
	
    this._foodSprites = [];
    var sprite1 = new Sprite()
    this._foodSprites.push(sprite1);
}

function Sprite() {
    types = ['APPLE', 'CHEESE', 'LEMON', 'CARROT', 'PIZZA', 'GRAPES']
    this.type = types[randomIntFromInterval(0, 5)];
    this.x = randomIntFromInterval(0, 300);
    this.y = 0;
    this.speed = 10;  // pixels per frame
}

_p = GameModel.prototype;

_p.reset = function() {
    console.log('reset');
    for (i = 0; i < this._foodSprites.length; i++) {
        this._foodSprites[i].y += this._foodSprites[i].speed;
    }
};
