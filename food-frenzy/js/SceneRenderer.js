/**
 * Scene view - the class reponsible for drawing the current state of the game
 * @param context the 2d context to draw in
 * @param model the GameModel to take data from
 */
function SceneRenderer(context, model) {
    this.ctx = context;
    this.model = model;
    
    // Background image
    this.backgroundImage = new Image();
    this.backgroundImage.onload = function() {
    }
    this.backgroundImage.src = "images/game_backdrop.png";
    
    // hero image
    this.heroImage = new Image();
    this.heroImage.src = "images/hero.png";

    //food sprite sheet
    this.foodImage = new Image();
    this.foodImage.src = "images/food.png";

    this.foodSpriteCropX = {'APPLE': 0, 'CHEESE': 40, 'LEMON': 80, 'CARROT': 120, 'PIZZA': 160, 'GRAPES': 200};
}

p = SceneRenderer.prototype;

/**
 * Repaints the whole board.
 */
p.repaint = function() {
    this.drawBackground(); 
    this.drawHero(this.model.hero); //TODO hero class with coordinqtes
    this.drawFood(this.model.foodSprites);
};

p.drawBackground = function() {
    var ctx = this.ctx;
    //if ((this.backgroundImage.width != this.model.xmax) || (this.backgroundImage.height != this.model.ymax)) {
    //    console.log(this.backgroundImage.width, this.model.xmax, this.backgroundImage.height, this.model.ymax);
    //    throw "background image dimensions and model dimensions don't match"
    //}
    ctx.drawImage(this.backgroundImage, 0, 0);  // don't hardcode 00 here TODO, check if loaded
};

p.drawHero = function(hero) {
    var ctx = this.ctx;
    var x = hero.x;
    var y = hero.y;
    ctx.drawImage(this.heroImage, x, y);  // TODO, check if loaded
};

p.drawFood = function(foodSprites) {
    var ctx = this.ctx;
    var swidth = this.model.foodSpriteWidth; // width of cropped image
    var sheight = this.model.foodSpriteHeight; // height of cropped image
    for (var i = 0; i < foodSprites.length; i++) {
        var x = foodSprites[i].x;
        var y = foodSprites[i].y;
        //var x = randomIntFromInterval(0, 300);
        //var y = randomIntFromInterval(0, 300);
        var sx = this.foodSpriteCropX[foodSprites[i].type]; // start crop
        var sy = 0; // start crop
        ctx.drawImage(this.foodImage, sx, sy, swidth, sheight, x, y, swidth, sheight);  // TODO, check if loaded
    }
};

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
