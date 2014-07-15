define(["global_constants", "global_variables", "game_methods"], function (gameConstants, gameVariables, GameMethods) {
    var Input = function (ball, rightPaddle, leftPaddle) {
        this.keyDown = function (inputEvent) {
            // IE code
            inputEvent = inputEvent || window.event;
            // Get the key code of the key that was pressed
            var key_pressed = inputEvent.keyCode;
            // Prevent the key's default actions
            inputEvent.preventDefault();
            
            // Opening scene input
            if (gameVariables.whichGame === "opening scene") {
                // If the key pressed is one or one on the numberpad...
                if (key_pressed === gameConstants.ONE_CODE || key_pressed === gameConstants.ONE_NUMPAD_CODE) {
                    // ... set the game mode to one player.
                    gameVariables.whichGame = "one player";
                }
                // If the key pressed is two or two on the numberpad...
                if (key_pressed === gameConstants.TWO_CODE || key_pressed === gameConstants.TWO_NUMPAD_CODE) {
                    // ... set the game mode to two player.
                    gameVariables.whichGame = "two player";
                }
            }
            
            // One-player game keydown input
            if (gameVariables.whichGame === "one player") {
                // If the key pressed is the spacebar and the ball isn't moving...
                if (key_pressed === gameConstants.SPACEBAR_CODE && ball.horizontalVelocity === gameConstants.STOPPED && ball.verticalVelocity === gameConstants.STOPPED) {
                    // ... make the ball go leftwards and downwards.
                    ball.horizontalVelocity = -gameConstants.BALL_VELOCITY;
                    ball.verticalVelocity = gameConstants.BALL_VELOCITY;
                }

                // If the key pressed is up arrow, w, a, or ' (single quote) and the paddle is not touching the top wall...
                if (key_pressed === gameConstants.UP_ARROW_CODE || key_pressed === gameConstants.W_CODE || key_pressed === gameConstants.A_CODE || key_pressed === gameConstants.SINGLE_QUOTE_CODE) {
                    if (rightPaddle.yPos > gameConstants.TOP_WALL) {
                        // ... make the paddle go upwards.
                        rightPaddle.velocity = -gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is down arrow, s, z, or / (forward slash) and the paddle is not touching the bottom wall...
                if (key_pressed === gameConstants.DOWN_ARROW_CODE || key_pressed === gameConstants.S_CODE || key_pressed === gameConstants.Z_CODE || key_pressed === gameConstants.FORWARD_SLASH_CODE) {
                    if ( (rightPaddle.yPos + rightPaddle.height) < gameConstants.BOTTOM_WALL ) {
                        // ... make the paddle go downwards.
                        rightPaddle.velocity = gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
            }
            
            // Two-player game keydown input
            if (gameVariables.whichGame === "two player") {
                // If the key pressed is the spacebar and the ball is not moving...
                if (key_pressed === gameConstants.SPACEBAR_CODE && ball.horizontalVelocity === gameConstants.STOPPED && ball.verticalVelocity === gameConstants.STOPPED) {
                    // ... make the ball move leftwards and downwards.
                    ball.horizontalVelocity = -gameConstants.BALL_VELOCITY;
                    ball.verticalVelocity = gameConstants.BALL_VELOCITY;
                }

                // If the key pressed is a and the left paddle is not touching the top wall...
                if (key_pressed === gameConstants.A_CODE) {
                    if (leftPaddle.yPos > gameConstants.TOP_WALL) {
                        // ... make the left paddle move upwards.
                        leftPaddle.velocity = -gameConstants.LEFT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is z and the left paddle is not touching the bottom wall...
                if (key_pressed === gameConstants.Z_CODE) {
                    if ( (leftPaddle.yPos + leftPaddle.height) < gameConstants.BOTTOM_WALL ) {
                        // ... make the left paddle move downwards.
                        leftPaddle.velocity = gameConstants.LEFT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is ' (single quote) and the right paddle is not touching the top wall...
                if (key_pressed === gameConstants.SINGLE_QUOTE_CODE) {
                    if (rightPaddle.yPos > gameConstants.TOP_WALL) {
                        // ... make the right paddle move upwards.
                        rightPaddle.velocity = -gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is / (forward slash) and the right paddle is not touching the bottom wall...
                if (key_pressed === gameConstants.FORWARD_SLASH_CODE) {
                    if ( (rightPaddle.yPos + rightPaddle.height) < gameConstants.BOTTOM_WALL ) {
                        // ... make the right paddle move downwards.
                        rightPaddle.velocity = gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
            }
            
            // Victory scene input
            if (gameVariables.whichGame === "victory scene") {
                if (key_pressed === gameConstants.ONE_CODE || key_pressed === gameConstants.ONE_NUMPAD_CODE) {
                    rightPaddle.score = gameConstants.NO_POINTS;
                    leftPaddle.score = gameConstants.NO_POINTS;
                    ball.horizontalVelocity = gameConstants.STOPPED;
                    ball.verticalVelocity = gameConstants.STOPPED;
                    gameVariables.whichGame = "one player";
                }
                if (key_pressed === gameConstants.TWO_CODE || key_pressed === gameConstants.TWO_NUMPAD_CODE) {
                    rightPaddle.score = gameConstants.NO_POINTS;
                    leftPaddle.score = gameConstants.NO_POINTS;
                    ball.horizontalVelocity = gameConstants.STOPPED;
                    ball.verticalVelocity = gameConstants.STOPPED;
                    gameVariables.whichGame = "two player";
                }
            }
        };
        this.keyUp = function (inputEvent) {
            // IE code
            inputEvent = inputEvent || window.event;
            // Get the key code of the key that was pressed
            var key_pressed = inputEvent.keyCode;
            
            // One-player keyup input
            if (gameVariables.whichGame === "one player") {
                // If any of the keys for going upwards are released...
                if (key_pressed === gameConstants.UP_ARROW_CODE || key_pressed === gameConstants.W_CODE || key_pressed === gameConstants.A_CODE || key_pressed === gameConstants.SINGLE_QUOTE_CODE) {
                    // ... stop moving the paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
                // If any of the keys for going downwards are released...
                if (key_pressed === gameConstants.DOWN_ARROW_CODE || key_pressed === gameConstants.S_CODE || key_pressed === gameConstants.Z_CODE || key_pressed === gameConstants.FORWARD_SLASH_CODE) {
                    // ... stop moving the paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
            }
            
            // Two-player keyup input
            if (gameVariables.whichGame === "two player") {
                // If a is released...
                if (key_pressed === gameConstants.A_CODE) {
                    // ... stop the left paddle.
                    leftPaddle.velocity = gameConstants.STOPPED;
                }
      
                // If z is released...
                if (key_pressed === gameConstants.Z_CODE) {
                    // ... stop the left paddle.
                    leftPaddle.velocity = gameConstants.STOPPED;
                }
      
                // If ' (single quote) is released...
                if (key_pressed === gameConstants.SINGLE_QUOTE_CODE) {
                    // ... stop the right paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
      
                // If / (forward slash) is released...
                if (key_pressed === gameConstants.FORWARD_SLASH_CODE) {
                    // ... stop the right paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
            }
        };
    };
    return Input;
});