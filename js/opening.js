define(["paddle_class", "ball_class", "game_methods", "constants"], function (Paddle, Ball, GameMethods, constants) {
  // Ball instance before the game.
  var ballBeforeGame = new Ball(constants.COLOR_PRE_GAME);
    
  // Right paddle instance before the game.
  var rightPaddleBeforeGame = new Paddle(
    constants.RIGHT_PADDLE_X_POS,
    constants.RIGHT_PADDLE_Y_POS,
    constants.RIGHT_HORIZONTAL_SCORE_POS,
    constants.RIGHT_VERTICAL_SCORE_POS,
    constants.COLOR_PRE_GAME
  );
  
  // Left paddle instance before the game.
  var leftPaddleBeforeGame = new Paddle(
    constants.LEFT_PADDLE_X_POS,
    constants.LEFT_PADDLE_Y_POS,
    constants.LEFT_HORIZONTAL_SCORE_POS,
    constants.LEFT_VERTICAL_SCORE_POS,
    constants.COLOR_PRE_GAME
  );
  
  var opening = new GameMethods(ballBeforeGame, rightPaddleBeforeGame, leftPaddleBeforeGame);
  opening.draw();
  opening.writeText();
});