define(["global_constants", "global_variables"], function (globalConstants, globalVariables) {
    var Input = function (ball, rightPaddle, leftPaddle) {
        this.keyDown = function (inputEvent) {
            // IE code
            inputEvent = inputEvent || window.event;
            // Get the key code of the key that was pressed
            var keyPressed = inputEvent.keyCode;
            // Prevent the key's default actions
            inputEvent.preventDefault();
            // Paddle collision constants (these can't go into globalConstants because they use objects unknown to globalConstants: `rightPaddle` and `leftPaddle`)
            var TOP_OF_RIGHT_PADDLE = rightPaddle.yPos;
            var BOTTOM_OF_RIGHT_PADDLE = rightPaddle.yPos + rightPaddle.height;
            var TOP_OF_LEFT_PADDLE = leftPaddle.yPos;
            var BOTTOM_OF_LEFT_PADDLE = leftPaddle.yPos + leftPaddle.height;
            
            // Opening scene input
            if (globalVariables.whichGame === "opening scene") {
                // If the key pressed is one or one on the numberpad...
                if (keyPressed === globalConstants.ONE_CODE || keyPressed === globalConstants.ONE_NUMPAD_CODE) {
                    // ... set the game mode to one player.
                    globalVariables.whichGame = "one player";
                }
                // If the key pressed is two or two on the numberpad...
                if (keyPressed === globalConstants.TWO_CODE || keyPressed === globalConstants.TWO_NUMPAD_CODE) {
                    // ... set the game mode to two player.
                    globalVariables.whichGame = "two player";
                }
            }
            
            // One-player game keydown input
            if (globalVariables.whichGame === "one player") {
                // If the key pressed is the spacebar and the ball isn't moving...
                if (keyPressed === globalConstants.SPACEBAR_CODE && ball.horizontalVelocity === globalConstants.STOPPED && ball.verticalVelocity === globalConstants.STOPPED) {
                    // ... make the ball go leftwards and downwards.
                    ball.horizontalVelocity = -globalConstants.BALL_VELOCITY;
                    ball.verticalVelocity = globalConstants.BALL_VELOCITY;
                }

                // If the key pressed is up arrow, w, a, or ' (single quote) and the paddle is not touching the top wall...
                if (keyPressed === globalConstants.UP_ARROW_CODE || keyPressed === globalConstants.W_CODE || keyPressed === globalConstants.A_CODE || keyPressed === globalConstants.SINGLE_QUOTE_CODE) {
                    if (TOP_OF_RIGHT_PADDLE > globalConstants.TOP_WALL) {
                        // ... make the paddle go upwards.
                        rightPaddle.velocity = -globalConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is down arrow, s, z, or / (forward slash) and the paddle is not touching the bottom wall...
                if (keyPressed === globalConstants.DOWN_ARROW_CODE || keyPressed === globalConstants.S_CODE || keyPressed === globalConstants.Z_CODE || keyPressed === globalConstants.FORWARD_SLASH_CODE) {
                    if (BOTTOM_OF_RIGHT_PADDLE < globalConstants.BOTTOM_WALL) {
                        // ... make the paddle go downwards.
                        rightPaddle.velocity = globalConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
            }
            
            // Two-player game keydown input
            if (globalVariables.whichGame === "two player") {
                // If the key pressed is the spacebar and the ball is not moving...
                if (keyPressed === globalConstants.SPACEBAR_CODE && ball.horizontalVelocity === globalConstants.STOPPED && ball.verticalVelocity === globalConstants.STOPPED) {
                    // ... make the ball move leftwards and downwards.
                    ball.horizontalVelocity = -globalConstants.BALL_VELOCITY;
                    ball.verticalVelocity = globalConstants.BALL_VELOCITY;
                }

                // If the key pressed is a and the left paddle is not touching the top wall...
                if (keyPressed === globalConstants.A_CODE) {
                    if (TOP_OF_LEFT_PADDLE > globalConstants.TOP_WALL) {
                        // ... make the left paddle move upwards.
                        leftPaddle.velocity = -globalConstants.LEFT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is z and the left paddle is not touching the bottom wall...
                if (keyPressed === globalConstants.Z_CODE) {
                    if (BOTTOM_OF_LEFT_PADDLE < globalConstants.BOTTOM_WALL) {
                        // ... make the left paddle move downwards.
                        leftPaddle.velocity = globalConstants.LEFT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is ' (single quote) and the right paddle is not touching the top wall...
                if (keyPressed === globalConstants.SINGLE_QUOTE_CODE) {
                    if (TOP_OF_RIGHT_PADDLE > globalConstants.TOP_WALL) {
                        // ... make the right paddle move upwards.
                        rightPaddle.velocity = -globalConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
      
                // If the key pressed is / (forward slash) and the right paddle is not touching the bottom wall...
                if (keyPressed === globalConstants.FORWARD_SLASH_CODE) {
                    if (BOTTOM_OF_RIGHT_PADDLE < globalConstants.BOTTOM_WALL) {
                        // ... make the right paddle move downwards.
                        rightPaddle.velocity = globalConstants.RIGHT_PADDLE_VELOCITY;
                    }
                }
            }
            
            // Victory scene input
            if (globalVariables.whichGame === "victory scene") {
                if (keyPressed === globalConstants.ONE_CODE || keyPressed === globalConstants.ONE_NUMPAD_CODE) {
                    rightPaddle.score = globalConstants.NO_POINTS;
                    leftPaddle.score = globalConstants.NO_POINTS;
                    ball.horizontalVelocity = globalConstants.STOPPED;
                    ball.verticalVelocity = globalConstants.STOPPED;
                    globalVariables.whichGame = "one player";
                }
                if (keyPressed === globalConstants.TWO_CODE || keyPressed === globalConstants.TWO_NUMPAD_CODE) {
                    rightPaddle.score = globalConstants.NO_POINTS;
                    leftPaddle.score = globalConstants.NO_POINTS;
                    ball.horizontalVelocity = globalConstants.STOPPED;
                    ball.verticalVelocity = globalConstants.STOPPED;
                    globalVariables.whichGame = "two player";
                }
            }
        };
        this.keyUp = function (inputEvent) {
            // IE code
            inputEvent = inputEvent || window.event;
            // Get the key code of the key that was pressed
            var keyReleased = inputEvent.keyCode;
            
            // One-player keyup input
            if (globalVariables.whichGame === "one player") {
                // If any of the keys for going upwards are released...
                if (keyReleased === globalConstants.UP_ARROW_CODE || keyReleased === globalConstants.W_CODE || keyReleased === globalConstants.A_CODE || keyReleased === globalConstants.SINGLE_QUOTE_CODE) {
                    // ... stop moving the paddle.
                    rightPaddle.velocity = globalConstants.STOPPED;
                }
                // If any of the keys for going downwards are released...
                if (keyReleased === globalConstants.DOWN_ARROW_CODE || keyReleased === globalConstants.S_CODE || keyReleased === globalConstants.Z_CODE || keyReleased === globalConstants.FORWARD_SLASH_CODE) {
                    // ... stop moving the paddle.
                    rightPaddle.velocity = globalConstants.STOPPED;
                }
            }
            
            // Two-player keyup input
            if (globalVariables.whichGame === "two player") {
                // If a is released...
                if (keyReleased === globalConstants.A_CODE) {
                    // ... stop the left paddle.
                    leftPaddle.velocity = globalConstants.STOPPED;
                }
      
                // If z is released...
                if (keyReleased === globalConstants.Z_CODE) {
                    // ... stop the left paddle.
                    leftPaddle.velocity = globalConstants.STOPPED;
                }
      
                // If ' (single quote) is released...
                if (keyReleased === globalConstants.SINGLE_QUOTE_CODE) {
                    // ... stop the right paddle.
                    rightPaddle.velocity = globalConstants.STOPPED;
                }
      
                // If / (forward slash) is released...
                if (keyReleased === globalConstants.FORWARD_SLASH_CODE) {
                    // ... stop the right paddle.
                    rightPaddle.velocity = globalConstants.STOPPED;
                }
            }
        };
    };
    return Input;
});