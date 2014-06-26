define(["input_handler", "game_methods", "global_constants", "global_variables"], function (InputHandler, GameMethods, gameConstants, gameVariables) {
    var OpeningScene = function (ball, rightPaddle, leftPaddle) {
        var gameMethods = new GameMethods(ball, rightPaddle, leftPaddle);
        this.draw = function () {
            gameMethods.draw();
            gameMethods.writeText();
        };
        this.update = function () {
            ball.updatePosition(rightPaddle, leftPaddle);
            rightPaddle.AIupdatePosition(ball);
            leftPaddle.AIupdatePosition(ball);
        };
        this.tick = function () {
            if (gameVariables.whichGame === null) {
                this.update();
                this.draw();
            }
        };
        if (gameVariables.whichGame === null) {
            onkeydown = function () {
                var event = new InputHandler(ball, rightPaddle, leftPaddle);
                event.openingSceneHandler();
                console.log("still in opening scene handler");
            };
        }
        if (gameVariables.whichGame === gameConstants.IS_AI) {
            onkeydown = function () {
                var event = new InputHandler(ball, rightPaddle, leftPaddle);
                event.onePlayerKeyDown();
            };
            onkeyup = function () {
                var event = new InputHandler(ball, rightPaddle, leftPaddle);
                event.onePlayerKeyUp();
            };
        }
    };
    return OpeningScene;
});