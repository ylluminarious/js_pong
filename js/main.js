require(["ball_class", "paddle_class", "opening", "buttons", "constants", "game_methods", "one_player_class"], function (Ball, Paddle, opening, buttons, constants, GameMethods, onePlayerGame) {
  var ball = new Ball(constants.COLOR);
  
  var rightPaddle = new Paddle(
    constants.RIGHT_PADDLE_X_POS,
    constants.RIGHT_PADDLE_Y_POS,
    constants.RIGHT_HORIZONTAL_SCORE_POS,
    constants.RIGHT_VERTICAL_SCORE_POS,
    constants.COLOR
  );
  
  var leftPaddle = new Paddle(
    constants.LEFT_PADDLE_X_POS,
    constants.LEFT_PADDLE_Y_POS,
    constants.LEFT_HORIZONTAL_SCORE_POS,
    constants.LEFT_VERTICAL_SCORE_POS,
    constants.COLOR
  );
  
  onkeydown = function (input) {
    // IE code
    input = input || window.event;
    var key_code = input.keyCode;
    if (key_code === constants.ONE_CODE || key_code === constants.ONE_NUMPAD_CODE) {
      var one = new onePlayerGame(ball, rightPaddle, leftPaddle);
      one.loop();
    }
    if (key_code === constants.TWO_CODE || key_code === constants.TWO_NUMPAD_CODE) {
      twoPlayer.twoPlayerGame();
    }
  };
});