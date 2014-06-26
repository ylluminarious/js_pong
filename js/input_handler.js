define(["global_constants", "global_variables", "one_player_class", "two_player_class"], function (gameConstants, gameVariables, OnePlayerGame, TwoPlayerGame) {
    var InputHandler = function (ball, rightPaddle, leftPaddle) {
        this.onePlayerKeyDown = function (input) {
            // IE code
            input = input || window.event;
            // Get the the code of whichever key was pressed.
            var key_code = input.keyCode;
            // Prevent the keys' default actions when pressed.
            input.preventDefault();
            // If key pressed is the spacebar and the ball isn't moving...
            if (key_code === gameConstants.SPACEBAR_CODE && ball.horizontalVelocity === gameConstants.STOPPED && ball.verticalVelocity === gameConstants.STOPPED) {
                // ... make the ball go leftwards and downwards.
                ball.horizontalVelocity = -gameConstants.BALL_VELOCITY;
                ball.verticalVelocity = gameConstants.BALL_VELOCITY;
            }

            // If key pressed is up arrow, w, a, or ' (single quote) and the paddle is not touching the top wall...
            if (key_code === gameConstants.UP_ARROW_CODE || key_code === gameConstants.W_CODE || key_code === gameConstants.A_CODE || key_code === gameConstants.SINGLE_QUOTE_CODE) {
                if (rightPaddle.y > gameConstants.TOP_WALL) {
                    // ... make the paddle go upwards.
                    rightPaddle.velocity = -gameConstants.RIGHT_PADDLE_VELOCITY;
                }
            }
      
            // If key pressed is down arrow, s, z, or / (forward slash) and the paddle is not touching the bottom wall...
            if (key_code === gameConstants.DOWN_ARROW_CODE || key_code === gameConstants.S_CODE || key_code === gameConstants.Z_CODE || key_code === gameConstants.FORWARD_SLASH_CODE) {
                if ( (rightPaddle.y + rightPaddle.height) < gameConstants.BOTTOM_WALL ) {
                    // ... make the paddle go downwards.
                    rightPaddle.velocity = gameConstants.RIGHT_PADDLE_VELOCITY;
                }
            }
        };
        this.onePlayerKeyUp = function (input) {
            input = input || window.event;
            var key_code = input.keyCode;
            // If any of the keys for going upwards are released...
            if (key_code === gameConstants.UP_ARROW_CODE || key_code === gameConstants.W_CODE || key_code === gameConstants.A_CODE || key_code === gameConstants.SINGLE_QUOTE_CODE) {
                // ... stop moving the paddle.
                rightPaddle.velocity = gameConstants.STOPPED;
            }
            // If any of the keys for going downwards are released...
            if (key_code === gameConstants.DOWN_ARROW_CODE || key_code === gameConstants.S_CODE || key_code === gameConstants.Z_CODE || key_code === gameConstants.FORWARD_SLASH_CODE) {
                // ... stop moving the paddle.
                rightPaddle.velocity = gameConstants.STOPPED;
            }
        };
        this.twoPlayerKeyDown = function (input) {
            input = input || window.event;
            var key_code = input.keyCode;
            // Prevent the keys' default action when pressed.
            input.preventDefault();
            // If key pressed is the spacebar and the ball is not moving...
            if (key_code === gameConstants.SPACEBAR_CODE && ball.horizontalVelocity === gameConstants.STOPPED && ball.verticalVelocity === gameConstants.STOPPED) {
                // ... make the ball move leftwards and downwards.
                ball.horizontalVelocity = -gameConstants.BALL_VELOCITY;
                ball.verticalVelocity = gameConstants.BALL_VELOCITY;
            }

            // If key pressed is a and the left paddle is not touching the top wall...
            if (key_code === gameConstants.A_CODE) {
                if (leftPaddle.y > gameConstants.TOP_WALL) {
                    // ... make the left paddle move upwards.
                    leftPaddle.velocity = -gameConstants.LEFT_PADDLE_VELOCITY;
                }
            }
      
            // If key pressed is z and the left paddle is not touching the bottom wall...
            if (key_code === gameConstants.Z_CODE) {
                if ( (leftPaddle.y + leftPaddle.height) < gameConstants.BOTTOM_WALL ) {
                    // ... make the left paddle move downwards.
                    leftPaddle.velocity = gameConstants.LEFT_PADDLE_VELOCITY;
                }
            }
      
            // If key pressed is ' (single quote) and the right paddle is not touching the top wall...
            if (key_code === gameConstants.SINGLE_QUOTE_CODE) {
                if (rightPaddle.y > gameConstants.TOP_WALL) {
                    // ... make the right paddle move upwards.
                    rightPaddle.velocity = -gameConstants.RIGHT_PADDLE_VELOCITY;
                }
            }
      
            // If key pressed is / (forward slash) and the right paddle is not touching the bottom wall...
            if (key_code === gameConstants.FORWARD_SLASH_CODE) {
                if ( (rightPaddle.y + rightPaddle.height) < gameConstants.BOTTOM_WALL ) {
                    // ... make the right paddle move downwards.
                    rightPaddle.velocity = gameConstants.RIGHT_PADDLE_VELOCITY;
                }
            }
        };
        this.twoPlayerKeyUp = function (input) {
            input = input || window.event;
            var key_code = input.keyCode;
            // If a is released...
            if (key_code === gameConstants.A_CODE) {
                // ... stop the left paddle.
                leftPaddle.velocity = gameConstants.STOPPED;
            }
      
            // If z is released...
            if (key_code === gameConstants.Z_CODE) {
                // ... stop the left paddle.
                leftPaddle.velocity = gameConstants.STOPPED;
            }
      
            // If ' (single quote) is released...
            if (key_code === gameConstants.SINGLE_QUOTE_CODE) {
                // ... stop the right paddle.
                rightPaddle.velocity = gameConstants.STOPPED;
            }
      
            // If / (forward slash) is released...
            if (key_code === gameConstants.FORWARD_SLASH_CODE) {
                // ... stop the right paddle.
                rightPaddle.velocity = gameConstants.STOPPED;
            }
        };
        this.openingSceneHandler = function (input) {
            input = input || window.event;
            var key_code = input.keyCode;
            input.preventDefault();
            if (key_code === gameConstants.ONE_CODE || key_code === gameConstants.ONE_NUMPAD_CODE) {
                gameVariables.whichGame = gameConstants.IS_AI;
            }
            if (key_code === gameConstants.TWO_CODE || key_code === gameConstants.TWO_NUMPAD_CODE) {
                gameVariables.whichGame = gameConstants.IS_NOT_AI;
            }
        };
        this.victorySceneHandler = function (input) {
            input = input || window.event;
            var key_code = input.keyCode;
            input.preventDefault();
            if (key_code === gameConstants.ONE_CODE || key_code === gameConstants.ONE_NUMPAD_CODE) {
                
            }
            if (key_code === gameConstants.TWO_CODE || key_code === gameConstants.TWO_NUMPAD_CODE) {
                
            }
        };
    };
    return InputHandler;
});