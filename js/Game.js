/**
 * This is the main class that handles the game life cycle. It initializes
 * other components like Game and GameModel, listens to the DOM events and
 * translates clicks to coordinates.
 * @param canvas the canvas object to use for drawing
 */
function Game(canvas) {
	this._gameRect = null;
	this._canvas = canvas;
	this._ctx = canvas.getContext("2d");
	this._gameModel = new GameModel();

	this._sceneRenderer = new SceneRenderer(this._ctx, this._gameModel);
	//this.handleResize();
}

_p = Game.prototype;

/**
 * Reset the _gameModel and redraw the game.
 */
_p._reset = function() {
	this._clearCanvas();
	this._gameModel.reset();
	this._sceneRenderer.repaint();
};

/**
 * Called when the screen has resized. In this case we need to calculate
 * new size and position for the game game and repaint it.
 */
_p.handleResize = function() {
	//this._clearCanvas();
	//this._gameRect = this._getGameRect();
	//this._sceneRenderer.setSize(this._gameRect.x, this._gameRect.y, this._gameRect.cellSize);
	this._sceneRenderer.repaint();
};

/**
 * Clears the background of the canvas with plain white color. If we want
 * to draw something like background picture or border, this is the good place
 * to do it.
 */
_p._clearCanvas = function() {
	this._ctx.fillStyle = "white";
	this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
};

/**
 * Handles the click (or tap) on the Canvas. Translates the canvas coordinates
 * into the column of the game board and makes the next turn in that column
 * @param x the x coordinate of the click or tap
 * @param y the y coordinate of the click or tap
 */
_p.handleClick = function(x, y) {
		this._reset();
};
