/**
 * This is the main class that handles the game life cycle. It initializes
 * other components like Game and GameModel, listens to the DOM events and
 * translates clicks to coordinates.
 * @param canvas the canvas object to use for drawing
 */
function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.gameModel = new GameModel();
    this.sceneRenderer = new SceneRenderer(this.ctx, this.gameModel);
}

p = Game.prototype;

/**
 * Reset the _gameModel and redraw the game.
 */
p.reset = function() {
    this.clearCanvas();
    this.gameModel.reset();
    this.sceneRenderer.repaint();
};

/**
 * Called when the screen has resized. In this case we need to calculate
 * new size and position for the game game and repaint it.
 */
p.handleResize = function() {
    this.sceneRenderer.repaint();
};

/**
 * Clears the background of the canvas with plain white color. If we want
 * to draw something like background picture or border, this is the good place
 * to do it.
 */
p.clearCanvas = function() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Handles the click (or tap) on the Canvas. Translates the canvas coordinates
 * into the column of the game board and makes the next turn in that column
 * @param x the x coordinate of the click or tap
 * @param y the y coordinate of the click or tap
 */
p.handleClick = function(x, y) {
		this.reset();
};

p.handleButtonClick = function() {
		this.reset();
};
