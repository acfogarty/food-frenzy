var game;

var timer = 0;
var frameStart = 0;

function init() {
    var canvas = initFullScreenCanvas("mainCanvas");
    var button = document.getElementById(controlButton);
    game = new Game(canvas);

    if (isTouchDevice()) {
        canvas.addEventListener("touchstart", function(e) {
            var touch = event.targetTouches[0];
            game.handleClick(touch.pageX, touch.pageY);
            e.stopPropagation();
            e.preventDefault();
        }, false);
    } else {
        canvas.addEventListener("mouseup", function(e) {
            game.handleClick(e.pageX, e.pageY);
            e.stopPropagation();
            e.preventDefault();
        }, false);
        //button.addEventListener("click", function(e) {
        //    console.log('here3');
        //    game.handleButtonClick();
        //    console.log('here3');
        //}, false);
    }
    onLoaded();
}

function onLoaded() {
    animate();
    console.log('onLoaded');
}

function animate() {
    var now = new Date().getTime();
    var passed = now - frameStart;
    if (passed > 60) {
        game._reset()
        frameStart = now;
        console.log('here');
    }
    requestAnimationFrame(arguments.callee, null);
}

function initFullScreenCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    resizeCanvas(canvas);
    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

function resizeCanvas(canvas) {
    canvas.width  = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
    game && game.handleResize();
}
