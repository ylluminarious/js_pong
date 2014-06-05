require(["ball_class", "paddle_class", "opening", "buttons", "constants", "game_methods"], function (Ball, Paddle, opening, buttons, constants, gameMethods) {
  
  function onePlayerGame () {
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
    
    gameMethods.draw(ball, rightPaddle, leftPaddle);
    gameMethods.update(ball, rightPaddle, leftPaddle, true);
    function tick () {
      gameMethods.tick(ball, rightPaddle, leftPaddle);
    }
    
    var mainLoop = setInterval(tick, constants.MILLESECONDS / constants.FPS);
  }
  
  
  function twoPlayerGame () {
    var ball = new Ball(constants.COLOR);
    
    var rightPaddle = new Paddle(
      constants.RIGHT_PADDLE_X_POS,
      constants.RIGHT_PADDLE_Y_POS,
      constants.COLOR
    );
    
    var leftPaddle = new Paddle(
      constants.LEFT_PADDLE_X_POS,
      constants.LEFT_PADDLE_Y_POS,
      constants.COLOR
    );
    onkeydown = function (input) {
      // IE code
      input = input || window.event;
      var key_code = input.keyCode;
      // Prevent the keys' default action when pressed.
      input.preventDefault();
    
      // If key pressed is the spacebar and the ball is not moving...
      if (key_code === constants.SPACEBAR_CODE && ball.horizontalVelocity === constants.STOPPED && ball.verticalVelocity === constants.STOPPED) {
        // ...set the ball's velocity to 400 leftwards and 400 downwards.
        ball.horizontalVelocity = -constants.BALL_VELOCITY;
        ball.verticalVelocity = constants.BALL_VELOCITY;
      }
    
      // If key pressed is a and the left paddle is not touching the top wall...
      if (key_code === constants.A_CODE) {
        if (leftPaddle.y > constants.TOP_WALL) {
          // ... make the paddle's velocity 250 upwards.
          leftPaddle.velocity = -constants.LEFT_PADDLE_VELOCITY;
        }
        // If key pressed is z and the left paddle is not touching the bottom wall...
      }
      if (key_code === constants.Z_CODE) {
        if ( (leftPaddle.y + leftPaddle.height) < constants.BOTTOM_WALL ) {
          // ... make the paddle's velocity 250 downwards.
          leftPaddle.velocity = constants.LEFT_PADDLE_VELOCITY;
        }
        // If key pressed is ' (single quote) and the right paddle is not touching the top wall...
      }
      if (key_code === constants.SINGLE_QUOTE_CODE) {
        if (rightPaddle.y > constants.TOP_WALL) {
          // ... make the paddle's velocity 250 upwards
          rightPaddle.velocity = -constants.RIGHT_PADDLE_VELOCITY;
        }
        // If key pressed is / (forward slash) and the right paddle is not touching the bottom wall...
      }
      if (key_code === constants.FORWARD_SLASH_CODE) {
        if ( (rightPaddle.y + rightPaddle.height) < constants.BOTTOM_WALL ) {
          // ... make the paddle's velocity 250 downwards.
          rightPaddle.velocity = constants.RIGHT_PADDLE_VELOCITY;
        }
      }
    };
    
    // Controls for the right paddle when a key is released.
    onkeyup = function (input) {
      // IE code
      input = input || window.event;
      var key_code = input.keyCode;
      // If a is released...
      if (key_code === constants.A_CODE) {
        // ... stop the left paddle.
        leftPaddle.velocity = constants.STOPPED;
        // If z is released...
      }
      if (key_code === constants.Z_CODE) {
        // ... stop the left paddle.
        leftPaddle.velocity = constants.STOPPED;
        // If ' (single quote) is released...
      }
      if (key_code === constants.SINGLE_QUOTE_CODE) {
        // ... stop the right paddle.
        rightPaddle.velocity = constants.STOPPED;
        // If / (forward slash) is released...
      }
      if (key_code === constants.FORWARD_SLASH_CODE) {
        // ... stop the right paddle.
        rightPaddle.velocity = constants.STOPPED;
      }
    };
    
    function draw () {
      constants.CONTEXT.clearRect(constants.ORIGIN, constants.ORIGIN, constants.FIELD.width, constants.FIELD.height);
      ball.draw();
      rightPaddle.draw();
      leftPaddle.draw();
    }
    function update () {
      ball.updatePosition(rightPaddle, leftPaddle);
      rightPaddle.updatePosition();
      leftPaddle.updatePosition();
    }
    function tick () {
      update();
      draw();
    }
    setInterval(tick, constants.MILLESECONDS / constants.FPS);
  }
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