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
            // Update position.
            this.xPos += this.horizontalVelocity / gameConstants.FPS;
            this.yPos += this.verticalVelocity / gameConstants.FPS;
            
            // -------------------- Start of ball collision code --------------------
            
            // Ball collision constants (these can't go into gameConstants because they use objects unknown to gameConstants, such as this, rightPaddle, leftPaddle, etc.)
            const topOfBall = this.yPos - gameConstants.BALL_RADIUS;
            const bottomOfBall = this.yPos + gameConstants.BALL_RADIUS;
            const rightSideOfBall = this.xPos + gameConstants.BALL_RADIUS;
            const leftSideOfBall = this.xPos - gameConstants.BALL_RADIUS;
            const frontSideOfRightPaddle = rightPaddle.xPos;
            const topOfRightPaddle = rightPaddle.yPos;
            const bottomOfRightPaddle = rightPaddle.yPos + rightPaddle.height;
            const frontSideOfLeftPaddle = leftPaddle.xPos + leftPaddle.width;
            const topOfLeftPaddle = leftPaddle.yPos;
            const bottomOfLeftPaddle = leftPaddle.yPos + leftPaddle.height;
            
            // Top wall collision
            if (topOfBall < gameConstants.TOP_WALL) {
                this.yPos = gameConstants.TOP_WALL + gameConstants.BALL_RADIUS;
                this.verticalVelocity = -this.verticalVelocity;
            }
            
            // Bottom wall collision
            if (bottomOfBall > gameConstants.BOTTOM_WALL) {
                this.yPos = gameConstants.BOTTOM_WALL - gameConstants.BALL_RADIUS;
                this.verticalVelocity = -this.verticalVelocity;
            }
            
            // Right paddle collison (when the ball goes past the front side of the paddle)
            if (rightSideOfBall > frontSideOfRightPaddle) {
                // Front side collision
                if (this.yPos > topOfRightPaddle) {
                    if (this.yPos < bottomOfRightPaddle) {
                        this.xPos = frontSideOfRightPaddle - gameConstants.BALL_RADIUS;
                        this.horizontalVelocity = -this.horizontalVelocity;
                    }
                }
                
                // Top side collision
                if (bottomOfBall > topOfRightPaddle) {
                    if (bottomOfBall < bottomOfRightPaddle) {
                        this.yPos = topOfRightPaddle - gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
                
                // Bottom side collision
                if (topOfBall < bottomOfRightPaddle) {
                    if (topOfBall > topOfRightPaddle) {
                        this.yPos = bottomOfRightPaddle + gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
            
            // Left paddle collision (when the ball goes past the front side of the paddle)
            if (leftSideOfBall < frontSideOfLeftPaddle) {
                // Front side collision
                if (this.yPos > topOfLeftPaddle) {
                    if (this.yPos < bottomOfLeftPaddle) {
                        this.xPos = frontSideOfLeftPaddle + gameConstants.BALL_RADIUS;
                        this.horizontalVelocity = -this.horizontalVelocity;
                    }
                }
                
                // Top side collision
                if (bottomOfBall > topOfLeftPaddle) {
                    if (bottomOfBall < bottomOfLeftPaddle) {
                        this.yPos = topOfLeftPaddle - gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
                
                // Bottom side collision
                if (topOfBall < bottomOfLeftPaddle) {
                    if (topOfBall > topOfLeftPaddle) {
                        this.yPos = bottomOfLeftPaddle + gameConstants.BALL_RADIUS;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
            
            // ******************** End of ball collision code ********************
            
            // Restart at center when the ball leaves the field and score a point for the paddle that scored.
            
            // When the ball goes past the right paddle...
            if (leftSideOfBall > gameConstants.RIGHT_WALL) {
                // ... restart at the center of the field and mark a point for the left paddle.
                this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
                leftPaddle.score++;
            }
            
            // When the ball goes past the left paddle...
            if (rightSideOfBall < gameConstants.LEFT_WALL) {
                // ... restart at the center of the field and mark a point for the right paddle.
                this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
                rightPaddle.score++;
            }
        };
    };
    return Ball;
});