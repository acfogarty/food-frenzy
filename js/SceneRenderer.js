/**
 * Scene view - the class reponsible for drawing the current state of the game
 * @param context the 2d context to draw in
 * @param model the GameModel to take data from
 */
function SceneRenderer(context, model) {
    this._ctx = context;
    this._model = model;
    
    // top left corner of the board
    this._x = 0;
    this._y = 0;
    
    // Width and height of the board rectangle
    this._width = 0;
    this._height = 0;
    
    // the optimal size of the board cell TODO remove?
    this._cellSize = 0;

    // Background image
    this._backgroundImage = new Image();
    this._backgroundImage.onload = function() {
    }
    this._backgroundImage.src = "images/game_backdrop.png";
    
    // hero image
    this._heroImage = new Image();
    this._heroImage.src = "images/hero.png";

    //food sprite sheet
    this._foodImage = new Image();
    this._foodImage.src = "images/food.png";

    this._foodTypes = ['GOOD','BAD','GOOD','GOOD','BAD','GOOD']; //TODO make dict
    this._foodSpriteCropX = {'APPLE': 0, 'CHEESE': 40, 'LEMON': 80, 'CARROT': 120, 'PIZZA': 160, 'GRAPES': 200};
    this._foodSpriteWidth = 40;
    this._foodSpriteHeight = 40;

    this._foodSprites = [];
    var sprite1 = new Sprite()
    sprite1.x = 100;
    sprite1.y = 100;
    this._foodSprites.push(sprite1);
}

function Sprite() {
    this.type = 'APPLE';
    this.x = 0;
    this.y = 0;
}

_p = SceneRenderer.prototype;

/**
 * Repaints the whole board.
 */
_p.repaint = function() {
    this._ctx.save();
    this._ctx.translate(this._x, this._y);
    bgImageSize = this._drawBackground();
    this._drawHero(bgImageSize.width*0.2, bgImageSize.height*0.8); //TODO hero class with coordinqtes
    this._drawFood(this._foodSprites);
    this._ctx.restore();
};

_p._drawBackground = function() {
    var ctx = this._ctx;
    ctx.drawImage(this._backgroundImage, 0, 0);  // don't hardcode 00 here TODO, check if loaded
    return {width: this._backgroundImage.width, height: this._backgroundImage.height};
};

_p._drawHero = function(x, y) {
    var ctx = this._ctx;
    ctx.drawImage(this._heroImage, x, y);  // TODO, check if loaded
};

_p._drawFood = function(foodSprites) {
    var ctx = this._ctx;
    var swidth = this._foodSpriteWidth; // width of cropped image
    var sheight = this._foodSpriteHeight; // height of cropped image
    for (i = 0; i < foodSprites.length; i++) {
        var x = foodSprites[i].x;
        var y = foodSprites[i].y;
        var sx = this._foodSpriteCropX[foodSprites[i].type]; // start crop
        var sy = 0; // start crop
        ctx.drawImage(this._foodImage, sx, sy, swidth, sheight, x, y, swidth, sheight);  // TODO, check if loaded
    }
};
