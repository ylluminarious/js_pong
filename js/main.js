require(["ball_class", "paddle_class", "opening", "buttons", "constants", "game_methods"], function (Ball, Paddle, opening, buttons, constants, gameMethods) {
  
  
  
  
  onkeydown = function (input) {
    // IE code
    input = input || window.event;
    var key_code = input.keyCode;
    if (key_code === constants.ONE_CODE || key_code === constants.ONE_NUMPAD_CODE) {
      onePlayerGame();
    }
    if (key_code === constants.TWO_CODE || key_code === constants.TWO_NUMPAD_CODE) {
      twoPlayerGame();
    }
  };
  
});