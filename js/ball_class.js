define(["global_constants", "global_variables"], function (gameConstants, gameVariables) {
    var Ball = function () {
        // Set the ball to the center of the field and make it stopped at the beginning.
        this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
        this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
        this.horizontalVelocity = gameConstants.STOPPED;
        this.verticalVelocity = gameConstants.STOPPED;
        // Draw the ball with the proper positions and dimensions.
        this.draw = function () {
            gameConstants.CONTEXT.beginPath();
            gameConstants.CONTEXT.arc(this.xPos, this.yPos, gameConstants.BALL_RADIUS, gameConstants.BALL_START_ANGLE, gameConstants.BALL_END_ANGLE);
            gameConstants.CONTEXT.fill();
        };
        // Update the ball's position depending on velocity. Also do collision detection for the ball.
        this.updatePosition = function (rightPaddle, leftPaddle) {
            this.xPos += this.horizontalVelocity / gameConstants.FPS;
            this.yPos += this.verticalVelocity / gameConstants.FPS;
            // -------------------- Start of ball collision code --------------------
            
            // Top wall collision.
            if ((this.yPos - gameConstants.BALL_RADIUS) < gameConstants.TOP_WALL) {
                this.yPos = gameConstants.BALL_RADIUS;
                this.verticalVelocity = -this.verticalVelocity;
            }
            
            // Bottom wall collision.
            if ((this.yPos + gameConstants.BALL_RADIUS) > gameConstants.BOTTOM_WALL) {
                this.yPos = gameConstants.BOTTOM_WALL - gameConstants.BALL_RADIUS;
                this.verticalVelocity = -this.verticalVelocity;
            }
            
            // Right paddle collison on the front side of the paddle.
            if ((this.xPos + gameConstants.BALL_RADIUS) > rightPaddle.xPos) {
                if (this.yPos > rightPaddle.yPos) {
                    if (this.yPos < (rightPaddle.yPos + rightPaddle.height)) {
                        this.xPos = rightPaddle.xPos - gameConstants.BALL_RADIUS;
                        this.horizontalVelocity = -this.horizontalVelocity;
                    }
                }
            }
            
            // Right paddle collision on the top side of the paddle.
            if ((this.xPos + gameConstants.BALL_RADIUS) > rightPaddle.xPos) {
                if ((this.yPos + gameConstants.BALL_RADIUS) > rightPaddle.yPos) {
                    if ((this.yPos + gameConstants.BALL_RADIUS) < (rightPaddle.yPos + rightPaddle.height)) {
                        this.yPos = rightPaddle.yPos - gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
            
            // Right paddle collision on the bottom side of the paddle.
            if ((this.xPos + gameConstants.BALL_RADIUS) > rightPaddle.xPos) {
                if ((this.yPos - gameConstants.BALL_RADIUS) < (rightPaddle.yPos + rightPaddle.height)) {
                    if ((this.yPos - gameConstants.BALL_RADIUS) > rightPaddle.yPos) {
                        this.yPos = (rightPaddle.yPos + rightPaddle.height) + gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
            
            // Left paddle collision on the front side of the paddle.
            if ((this.xPos - gameConstants.BALL_RADIUS) < (leftPaddle.xPos + leftPaddle.width)) {
                if (this.yPos > leftPaddle.yPos) {
                    if (this.yPos < (leftPaddle.yPos + leftPaddle.height)) {
                        this.xPos = (leftPaddle.xPos + leftPaddle.width) + gameConstants.BALL_RADIUS;
                        this.horizontalVelocity = -this.horizontalVelocity;
                    }
                }
            }
            
            // Left paddle collision on the top side of the paddle.
            if ((this.xPos - gameConstants.BALL_RADIUS) < (leftPaddle.xPos + leftPaddle.width)) {
                if ((this.yPos + gameConstants.BALL_RADIUS) > leftPaddle.yPos) {
                    if ((this.yPos + gameConstants.BALL_RADIUS) < (leftPaddle.yPos + leftPaddle.height)) {
                        this.yPos = leftPaddle.yPos - gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
            
            // Left paddle collision on the bottom side of the paddle.
            if ((this.xPos - gameConstants.BALL_RADIUS) < (leftPaddle.xPos + leftPaddle.width)) {
                if ((this.yPos - gameConstants.BALL_RADIUS) < (leftPaddle.yPos + leftPaddle.height)) {
                    if ((this.yPos - gameConstants.BALL_RADIUS) > leftPaddle.yPos) {
                        this.yPos = (leftPaddle.yPos + leftPaddle.height) + gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
            
            // ******************** End of ball collision code ********************
            
            // Restart at center when the ball leaves the field and score a point for the paddle that scored.
            
            // When the ball goes past the right paddle...
            if ((this.xPos - gameConstants.BALL_RADIUS) > gameConstants.RIGHT_WALL) {
                // ... restart at the center of the field and mark a point for the left paddle.
                this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
                leftPaddle.score++;
            }
            
            // When the ball goes past the left paddle...
            if ((this.xPos + gameConstants.BALL_RADIUS) < gameConstants.LEFT_WALL) {
                // ... restart at the center of the field and mark a point for the right paddle.
                this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
                rightPaddle.score++;
            }
        };
    };
    return Ball;
});