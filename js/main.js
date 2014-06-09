require(["ball_class", "paddle_class", "opening", "buttons", "constants", "game_methods"], function (Ball, Paddle, opening, buttons, constants, gameMethods) {
  
  
  
  var onePlayer = new GameMethods(ball, rightPaddle, leftPaddle, constants.IS_AI);
  var twoPlayer = new GameMethods(ball, rightPaddle, leftPaddle, constants.IS_NOT_AI);
  
  onkeydown = function (input) {
    // IE code
    input = input || window.event;
    var key_code = input.keyCode;
    if (key_code === constants.ONE_CODE || key_code === constants.ONE_NUMPAD_CODE) {
      onePlayerGame();
      onePlayer.onePlayerGame();
    }
    if (key_code === constants.TWO_CODE || key_code === constants.TWO_NUMPAD_CODE) {
      twoPlayerGame();
      twoPlayer.twoPlayerGame();
    }
  };
  
});