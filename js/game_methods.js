define(["constants", "one_player_class"], function (constants, OnePlayerGame) {
  var GameMethods = function (ball, rightPaddle, leftPaddle, isAI) {
    this.ball = ball; 
    this.rightPaddle = rightPaddle;
    this.leftPaddle = leftPaddle;
    this.draw = function () {
      constants.CONTEXT.clearRect(constants.ORIGIN, constants.ORIGIN, constants.FIELD.width, constants.FIELD.height);
      ball.draw();
      rightPaddle.draw();
      leftPaddle.draw();
    };
    this.update = function () {
      ball.updatePosition(rightPaddle, leftPaddle);
      rightPaddle.updatePosition();
      if (isAI) {
        leftPaddle.AIupdatePosition(ball);
      } else {
        leftPaddle.updatePosition();
      }
    };
    this.writeText = function () {
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
    };
    this.victory = function (loopToClear) {
      this.writeText();
      clearInterval(loopToClear);
      onkeydown = function (input) {
        // IE code
        input = input || window.event;
        var key_code = input.keyCode;
        input.preventDefault();
        if (key_code === constants.ONE_CODE || key_code === constants.ONE_NUMPAD_CODE) {
          var newGame = new OnePlayerGame(ball, rightPaddle, leftPaddle);
          newGame.loop();
        }
        if (key_code === constants.TWO_CODE || key_code === constants.TWO_NUMPAD_CODE) {
          this.twoPlayerGame();
        }
      };
    };
    this.tick = function (loopToClear) {
      if (!constants.PAUSED) {
        this.draw();
        this.update();
        if (rightPaddle.score === 1 || leftPaddle.score === 1) {
          this.victory(loopToClear);
        }
      }
    };
  };
  return GameMethods;
});