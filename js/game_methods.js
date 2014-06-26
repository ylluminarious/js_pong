define(["global_constants", "global_variables", "input_handler"], function (gameConstants, gameVariables, InputHandler) {
    var GameMethods = function (ball, rightPaddle, leftPaddle) {
        this.draw = function () {
            gameConstants.CONTEXT.clearRect(gameConstants.ORIGIN, gameConstants.ORIGIN, gameConstants.FIELD.width, gameConstants.FIELD.height);
            ball.draw();
            rightPaddle.draw();
            leftPaddle.draw();
        };
        this.update = function () {
            ball.updatePosition(rightPaddle, leftPaddle);
            rightPaddle.updatePosition();
            if (gameVariables.whichGame === gameConstants.IS_AI) {
                leftPaddle.AIupdatePosition(ball);
            } else if (gameVariables.whichGame === gameConstants.IS_NOT_AI) {
                leftPaddle.updatePosition();
            }
        };
        this.writeText = function () {
            gameConstants.CONTEXT.fillStyle = gameConstants.COLOR;
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
        this.victory = function (intervalToClear) {
            this.writeText();
            clearInterval(intervalToClear);
            onkeydown = function () {
                var event = new InputHandler(ball, rightPaddle, leftPaddle);
                event.victorySceneHandler();
            };
        };
        this.tick = function (intervalToClear) {
            if (!gameVariables.paused && gameVariables.whichGame !== null) {
                this.update();
                this.draw();
            }
        };
    };
    return GameMethods;
});