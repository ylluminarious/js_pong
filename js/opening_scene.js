define(["game_methods", "global_constants"], function (GameMethods, gameConstants) {
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
            gameConstants.CONTEXT.clearRect(gameConstants.ORIGIN, gameConstants.ORIGIN, gameConstants.FIELD.width, gameConstants.FIELD.height);
            this.update();
            this.draw();
        };
    };
    return OpeningScene;
});