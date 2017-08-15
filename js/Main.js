        var game;
        
        function init() {
            var canvas = initFullScreenCanvas("mainCanvas");
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
            }
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
        
        function isTouchDevice() {
            return ('ontouchstart' in document.documentElement);
        }
