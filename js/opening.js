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
            this.update();
            this.draw();
        };
    };
    return OpeningScene;
});