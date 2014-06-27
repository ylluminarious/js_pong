define(["input_handler"], function (InputHandler) {
    var TwoPlayerGame = function (ball, rightPaddle, leftPaddle) {
        onkeydown = function () {
            var event = new InputHandler(ball, rightPaddle, leftPaddle);
            event.keyDown();
        };
        onkeyup = function () {
            var event = new InputHandler(ball, rightPaddle, leftPaddle);
            event.keyUp();
        };
    };
    return TwoPlayerGame;
});