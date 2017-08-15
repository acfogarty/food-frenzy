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
    this._backgroundImage.src = "images/game_backdrop.png";
    
    // hero image
    this._heroImage = new Image();
    this._heroImage.src = "images/hero.png";
}

_p = SceneRenderer.prototype;

/**
 * Repaints the whole board.
 */
_p.repaint = function() {
    this._ctx.save();
    this._ctx.translate(this._x, this._y);
    this._drawBackground();
    this._drawHero();
    //this._drawSprites();
    this._ctx.restore();
};

_p._drawBackground = function() {
    var ctx = this._ctx;
    ctx.drawImage(this._backgroundImage, 0, 0);  // don't hardcode 00 here TODO, check if loaded
};

_p._drawHero = function() {
    var ctx = this._ctx;
    ctx.drawImage(this._heroImage, 0, 0);  // don't hardcode 00 here TODO, check if loaded
};
