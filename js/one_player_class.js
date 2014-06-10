define(["constants", "game_methods"], function (constants, GameMethods) {
  var OnePlayerGame = function (ball, rightPaddle, leftPaddle) {
    this.ball = ball;
    this.rightPaddle = rightPaddle;
    this.leftPaddle = leftPaddle;
    this.loop = function () {
      var game = new GameMethods(ball, rightPaddle, leftPaddle, constants.IS_AI);
      var mainLoop = setInterval(tick, constants.MILLESECONDS / constants.FPS);
      function tick () {
        game.tick(mainLoop);
      }
    };
    onkeydown = function (input) {
      // IE code
      input = input || window.event;
      var key_code = input.keyCode;
      // Prevent the keys' default actions when pressed.
      input.preventDefault();
      // If key pressed is the spacebar and the ball isn't moving...
      if (key_code === constants.SPACEBAR_CODE && ball.horizontalVelocity === constants.STOPPED && ball.verticalVelocity === constants.STOPPED) {
        // ...set the ball's velocity to 400 leftwards and 400 downwards.
        ball.horizontalVelocity = -constants.BALL_VELOCITY;
        ball.verticalVelocity = constants.BALL_VELOCITY;
      }

      // If key pressed is up arrow, w, a, or ' (single quote) and the paddle is not touching the top wall...
      if (key_code === constants.UP_ARROW_CODE || key_code === constants.W_CODE || key_code === constants.A_CODE || key_code === constants.SINGLE_QUOTE_CODE) {
        if (rightPaddle.y > constants.TOP_WALL) {
          // ... make the paddle's velocity 250 upwards.
          rightPaddle.velocity = -constants.RIGHT_PADDLE_VELOCITY;
        }
        // If key pressed is down arrow, s, z, or / (forward slash) and the paddle is not touching the bottom wall...
      }
      if (key_code === constants.DOWN_ARROW_CODE || key_code === constants.S_CODE || key_code === constants.Z_CODE || key_code === constants.FORWARD_SLASH_CODE) {
        if ( (rightPaddle.y + rightPaddle.height) < constants.BOTTOM_WALL ) {
          // ... make the paddle's velocity 250 downwards.
          rightPaddle.velocity = constants.RIGHT_PADDLE_VELOCITY;
        }
      }
    };
  
    onkeyup = function (input) {
      // IE code
      input = input || window.event;
      var key_code = input.keyCode;
      // If any of the keys for going upwards are released...
      if (key_code === constants.UP_ARROW_CODE || key_code === constants.W_CODE || key_code === constants.A_CODE || key_code === constants.SINGLE_QUOTE_CODE) {
        // ... stop moving the paddle.
        rightPaddle.velocity = constants.STOPPED;
        // If any of the keys for going downwards are released...
      }
      if (key_code === constants.DOWN_ARROW_CODE || key_code === constants.S_CODE || key_code === constants.Z_CODE || key_code === constants.FORWARD_SLASH_CODE) {
        // ... stop moving the paddle.
        rightPaddle.velocity = constants.STOPPED;
      }
    };
  };
  return OnePlayerGame;
});