define(["input_handler"], function (InputHandler) {
    var TwoPlayerGame = function (ball, rightPaddle, leftPaddle) {
        onkeydown = function () {
            var event = new InputHandler(ball, rightPaddle, leftPaddle);
            event.twoPlayerKeyDown();
        };
        onkeyup = function () {
            var event = new InputHandler(ball, rightPaddle, leftPaddle);
            event.twoPlayerKeyUp();
        };
    };
    return TwoPlayerGame;
});