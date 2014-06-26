define(["input_handler"], function (InputHandler) {
    var OnePlayerGame = function (ball, rightPaddle, leftPaddle) {
        onkeydown = function () {
            var event = new InputHandler(ball, rightPaddle, leftPaddle);
            event.onePlayerKeyDown();
        };
        onkeyup = function () {
            var event = new InputHandler(ball, rightPaddle, leftPaddle);
            event.onePlayerKeyUp();
        };
    };
    return OnePlayerGame;
});