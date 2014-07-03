define(["global_constants", "global_variables"], function (gameConstants, gameVariables) {
    var GameMethods = function (ball, rightPaddle, leftPaddle) {
        // Draws the objects of the game, and the text as well, but only in the victory scene.
        this.draw = function () {
            ball.draw();
            rightPaddle.draw();
            leftPaddle.draw();
            if (gameVariables.whichGame === "victory scene") {
                this.writeText();
            }
        };
        // Updates the positions of the game objects, and does so differently depending on which game scene is current.
        this.update = function () {
            ball.updatePosition(rightPaddle, leftPaddle);
            rightPaddle.updatePosition();
            if (rightPaddle.score === gameConstants.POINTS_TO_WIN || leftPaddle.score === gameConstants.POINTS_TO_WIN) {
                gameVariables.whichGame = "victory scene";
                ball.x = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                ball.y = gameConstants.VERTICAL_CENTER_OF_FIELD;
                rightPaddle.x = gameConstants.RIGHT_PADDLE_X_POS;
                rightPaddle.y = gameConstants.RIGHT_PADDLE_Y_POS;
                leftPaddle.x = gameConstants.LEFT_PADDLE_X_POS;
                leftPaddle.y = gameConstants.LEFT_PADDLE_Y_POS;
                ball.horizontalVelocity = gameConstants.STOPPED;
                ball.verticalVelocity = gameConstants.STOPPED;
                rightPaddle.horizontalVelocity = gameConstants.STOPPED;
                rightPaddle.verticalVelocity = gameConstants.STOPPED;
                leftPaddle.horizontalVelocity = gameConstants.STOPPED;
                leftPaddle.verticalVelocity = gameConstants.STOPPED;
            }
            if (gameVariables.whichGame === "one player") {
                leftPaddle.AIupdatePosition(ball);
            } else if (gameVariables.whichGame === "two player") {
                leftPaddle.updatePosition();
            }
        };
        // Method that writes the instructional text telling you how to pick which game you want.
        this.writeText = function () {
            gameConstants.CONTEXT.fillStyle = "white";
            gameConstants.CONTEXT.font = gameConstants.TEXT_FONT;
            gameConstants.CONTEXT.fillText("Press \"1\" for single player",
            gameConstants.LEFT_BUTTON_INSTRUCTIONS_X_POS,
            gameConstants.LEFT_BUTTON_INSTRUCTIONS_Y_POS
            );
            gameConstants.CONTEXT.fillText("Press \"2\" for double player",
            gameConstants.RIGHT_BUTTON_INSTRUCTIONS_X_POS,
            gameConstants.RIGHT_BUTTON_INSTRUCTIONS_Y_POS
            );
        };
        // Method for the buttons of the game (uses jQuery to make them work).
        this.buttons = function () {
            // Click toggle method for the play/pause button (standard jQuery no longer has a toggle method for clicking).
            (function($) {
                $.fn.clickToggle = function(func1, func2) {
                    var funcs = [func1, func2];
                    this.data('toggleclicked', 0);
                    this.click(function() {
                        var data = $(this).data();
                        var tc = data.toggleclicked;
                        $.proxy(funcs[tc], this)();
                        data.toggleclicked = (tc + 1) % 2;
                    });
                    return this;
                };
            }(jQuery));
            // Pause, play, and restart buttons' code.
            $("#pause_button").clickToggle(function () {
                gameVariables.paused = true;
                $("#pause_button").html("&#9658;");
            }, function () {
                gameVariables.paused = false;
                $("#pause_button").html("&#10074;&#10074;");
            });
            $("#restart_button").click(function () {
                rightPaddle.score = gameConstants.NO_POINTS;
                leftPaddle.score = gameConstants.NO_POINTS;
                ball.x = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                ball.y = gameConstants.VERTICAL_CENTER_OF_FIELD;
                rightPaddle.x = gameConstants.RIGHT_PADDLE_X_POS;
                rightPaddle.y = gameConstants.RIGHT_PADDLE_Y_POS;
                leftPaddle.x = gameConstants.LEFT_PADDLE_X_POS;
                leftPaddle.y = gameConstants.LEFT_PADDLE_Y_POS;
                ball.horizontalVelocity = gameConstants.STOPPED;
                ball.verticalVelocity = gameConstants.STOPPED;
                rightPaddle.horizontalVelocity = gameConstants.STOPPED;
                rightPaddle.verticalVelocity = gameConstants.STOPPED;
                leftPaddle.horizontalVelocity = gameConstants.STOPPED;
                leftPaddle.verticalVelocity = gameConstants.STOPPED;
            });
        };
        this.tick = function (intervalToClear) {
            if (!gameVariables.paused && gameVariables.whichGame !== "opening scene") {
                gameConstants.CONTEXT.clearRect(gameConstants.ORIGIN, gameConstants.ORIGIN, gameConstants.FIELD.width, gameConstants.FIELD.height);
                this.update();
                this.draw();
            }
        };
    };
    return GameMethods;
});