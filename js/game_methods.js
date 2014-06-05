define(["paddle_class", "ball_class", "constants"], function (Paddle, Ball, constants) {
  var gameMethods = {
    draw: function (ball, rightPaddle, leftPaddle) {
      constants.CONTEXT.clearRect(constants.ORIGIN, constants.ORIGIN, constants.FIELD.width, constants.FIELD.height);
      ball.draw();
      rightPaddle.draw();
      leftPaddle.draw();
    },
    update: function (ball, rightPaddle, leftPaddle, isAI) {
      ball.updatePosition(rightPaddle, leftPaddle);
      rightPaddle.updatePosition();
      if (isAI) {
        leftPaddle.AIupdatePosition(ball);
      } else {
        leftPaddle.updatePosition();
      }
    },
    writeText: function () {
      constants.CONTEXT.fillStyle = constants.COLOR;
      constants.CONTEXT.font = constants.TEXT_FONT;
      constants.CONTEXT.fillText("Press \"1\" for single player",
      constants.LEFT_BUTTON_INSTRUCTIONS_X_POS,
      constants.LEFT_BUTTON_INSTRUCTIONS_Y_POS
    );
      constants.CONTEXT.fillText("Press \"2\" for double player",
      constants.RIGHT_BUTTON_INSTRUCTIONS_X_POS,
      constants.RIGHT_BUTTON_INSTRUCTIONS_Y_POS
    );
    },
    victory: function (loopToClear) {
      gameMethods.writeText();
      clearInterval(loopToClear);
      onkeydown = function (input) {
        // IE code
        input = input || window.event;
        var key_code = input.keyCode;
        input.preventDefault();
        if (key_code === constants.ONE_CODE || key_code === constants.ONE_NUMPAD_CODE) {
          onePlayerGame();
        }
        if (key_code === TWO_CODE || key_code === TWO_NUMPAD_CODE) {
          twoPlayerGame();
        }
      }
    },
    tick: function (ball, rightPaddle, leftPaddle) {
      if (!constants.PAUSED) {
        gameMethods.draw(ball, rightPaddle, leftPaddle);
        gameMethods.update(ball, rightPaddle, leftPaddle);
      }
    }
  };
  return gameMethods;
});
