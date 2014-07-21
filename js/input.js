define(["global_constants", "global_variables"], function (gameConstants, gameVariables) {
    var Input = function (ball, rightPaddle, leftPaddle) {
        this.keyDown = function (inputEvent) {
            // IE code
            inputEvent = inputEvent || window.event;
            // Get the key code of the key that was pressed
            var keyPressed = inputEvent.keyCode;
            // Prevent the key's default actions
            inputEvent.preventDefault();
            // Paddle collision constants (these can't go into gameConstants because they use objects unknown to gameConstants: rightPaddle and leftPaddle)
            const TOP_OF_RIGHT_PADDLE = rightPaddle.yPos;
            const BOTTOM_OF_RIGHT_PADDLE = rightPaddle.yPos + rightPaddle.height;
            const TOP_OF_LEFT_PADDLE = leftPaddle.yPos;
            const BOTTOM_OF_LEFT_PADDLE = leftPaddle.yPos + leftPaddle.height;
            
            // Opening scene input
            if (gameVariables.whichGame === "opening scene") {
                // If the key pressed is one or one on the numberpad...
                if (keyPressed === gameConstants.ONE_CODE || keyPressed === gameConstants.ONE_NUMPAD_CODE) {
                    // ... set the game mode to one player.
                    gameVariables.whichGame = "one player";
                }
                // If the key pressed is two or two on the numberpad...
                if (keyPressed === gameConstants.TWO_CODE || keyPressed === gameConstants.TWO_NUMPAD_CODE) {
                    // ... set the game mode to two player.
                    gameVariables.whichGame = "two player";
                }
            }
            
            // One-player game keydown input
            if (gameVariables.whichGame === "one player") {
                // If the key pressed is the spacebar and the ball isn't moving...
                if (keyPressed === gameConstants.SPACEBAR_CODE && ball.horizontalVelocity === gameConstants.STOPPED && ball.verticalVelocity === gameConstants.STOPPED) {
                    // ... make the ball go leftwards and downwards.
                    ball.horizontalVelocity = -gameConstants.BALL_VELOCITY;
                    ball.verticalVelocity = gameConstants.BALL_VELOCITY;
                }

                // If the key pressed is up arrow, w, a, or ' (single quote) and the paddle is not touching the top wall...
                if (keyPressed === gameConstants.UP_ARROW_CODE || keyPressed === gameConstants.W_CODE || keyPressed === gameConstants.A_CODE || keyPressed === gameConstants.SINGLE_QUOTE_CODE) {
                    if (TOP_OF_RIGHT_PADDLE > gameConstants.TOP_WALL) {
                        // ... make the paddle go upwards.
                        rightPaddle.velocity = -gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is down arrow, s, z, or / (forward slash) and the paddle is not touching the bottom wall...
                if (keyPressed === gameConstants.DOWN_ARROW_CODE || keyPressed === gameConstants.S_CODE || keyPressed === gameConstants.Z_CODE || keyPressed === gameConstants.FORWARD_SLASH_CODE) {
                    if (BOTTOM_OF_RIGHT_PADDLE < gameConstants.BOTTOM_WALL) {
                        // ... make the paddle go downwards.
                        rightPaddle.velocity = gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
            }
            
            // Two-player game keydown input
            if (gameVariables.whichGame === "two player") {
                // If the key pressed is the spacebar and the ball is not moving...
                if (keyPressed === gameConstants.SPACEBAR_CODE && ball.horizontalVelocity === gameConstants.STOPPED && ball.verticalVelocity === gameConstants.STOPPED) {
                    // ... make the ball move leftwards and downwards.
                    ball.horizontalVelocity = -gameConstants.BALL_VELOCITY;
                    ball.verticalVelocity = gameConstants.BALL_VELOCITY;
                }

                // If the key pressed is a and the left paddle is not touching the top wall...
                if (keyPressed === gameConstants.A_CODE) {
                    if (TOP_OF_LEFT_PADDLE > gameConstants.TOP_WALL) {
                        // ... make the left paddle move upwards.
                        leftPaddle.velocity = -gameConstants.LEFT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is z and the left paddle is not touching the bottom wall...
                if (keyPressed === gameConstants.Z_CODE) {
                    if (BOTTOM_OF_LEFT_PADDLE < gameConstants.BOTTOM_WALL) {
                        // ... make the left paddle move downwards.
                        leftPaddle.velocity = gameConstants.LEFT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is ' (single quote) and the right paddle is not touching the top wall...
                if (keyPressed === gameConstants.SINGLE_QUOTE_CODE) {
                    if (TOP_OF_RIGHT_PADDLE > gameConstants.TOP_WALL) {
                        // ... make the right paddle move upwards.
                        rightPaddle.velocity = -gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is / (forward slash) and the right paddle is not touching the bottom wall...
                if (keyPressed === gameConstants.FORWARD_SLASH_CODE) {
                    if (BOTTOM_OF_RIGHT_PADDLE < gameConstants.BOTTOM_WALL) {
                        // ... make the right paddle move downwards.
                        rightPaddle.velocity = gameConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
            }
            
            // Victory scene input
            if (gameVariables.whichGame === "victory scene") {
                if (keyPressed === gameConstants.ONE_CODE || keyPressed === gameConstants.ONE_NUMPAD_CODE) {
                    rightPaddle.score = gameConstants.NO_POINTS;
                    leftPaddle.score = gameConstants.NO_POINTS;
                    ball.horizontalVelocity = gameConstants.STOPPED;
                    ball.verticalVelocity = gameConstants.STOPPED;
                    gameVariables.whichGame = "one player";
                }
                if (keyPressed === gameConstants.TWO_CODE || keyPressed === gameConstants.TWO_NUMPAD_CODE) {
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
            var keyReleased = inputEvent.keyCode;
            
            // One-player keyup input
            if (gameVariables.whichGame === "one player") {
                // If any of the keys for going upwards are released...
                if (keyReleased === gameConstants.UP_ARROW_CODE || keyReleased === gameConstants.W_CODE || keyReleased === gameConstants.A_CODE || keyReleased === gameConstants.SINGLE_QUOTE_CODE) {
                    // ... stop moving the paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
                // If any of the keys for going downwards are released...
                if (keyReleased === gameConstants.DOWN_ARROW_CODE || keyReleased === gameConstants.S_CODE || keyReleased === gameConstants.Z_CODE || keyReleased === gameConstants.FORWARD_SLASH_CODE) {
                    // ... stop moving the paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
            }
            
            // Two-player keyup input
            if (gameVariables.whichGame === "two player") {
                // If a is released...
                if (keyReleased === gameConstants.A_CODE) {
                    // ... stop the left paddle.
                    leftPaddle.velocity = gameConstants.STOPPED;
                }
      
                // If z is released...
                if (keyReleased === gameConstants.Z_CODE) {
                    // ... stop the left paddle.
                    leftPaddle.velocity = gameConstants.STOPPED;
                }
      
                // If ' (single quote) is released...
                if (keyReleased === gameConstants.SINGLE_QUOTE_CODE) {
                    // ... stop the right paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
      
                // If / (forward slash) is released...
                if (keyReleased === gameConstants.FORWARD_SLASH_CODE) {
                    // ... stop the right paddle.
                    rightPaddle.velocity = gameConstants.STOPPED;
                }
            }
        };
    };
    return Input;
});