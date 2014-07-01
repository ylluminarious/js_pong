define(["global_constants", "global_variables"], function (gameConstants, gameVariables) {
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
            if (rightPaddle.score === gameConstants.POINTS_TO_WIN || leftPaddle.score === gameConstants.POINTS_TO_WIN) {
                gameVariables.whichGame = "victory scene";
            }
            if (gameVariables.whichGame === "one player") {
                leftPaddle.AIupdatePosition(ball);
            } else if (gameVariables.whichGame === "two player") {
                leftPaddle.updatePosition();
            } else if (gameVariables.whichGame === "victory scene") {
                this.writeText();
                ball.horizontalVelocity = gameConstants.STOPPED;
                ball.verticalVelocity = gameConstants.STOPPED;
                rightPaddle.horizontalVelocity = gameConstants.STOPPED;
                rightPaddle.verticalVelocity = gameConstants.STOPPED;
                leftPaddle.horizontalVelocity = gameConstants.STOPPED;
                leftPaddle.verticalVelocity = gameConstants.STOPPED;
            }
        };
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
        this.victoryScene = function (intervalToClear) {
            this.writeText();
            clearInterval(intervalToClear);
        };
        this.tick = function (intervalToClear) {
            if (!gameVariables.paused && gameVariables.whichGame !== "opening scene") {
                this.update();
                this.draw();
            }
        };
    };
    return GameMethods;
});