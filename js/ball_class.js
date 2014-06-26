define(["global_constants"], function (gameConstants) {
    var Ball = function (color) {
        this.x = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
        this.y = gameConstants.VERTICAL_CENTER_OF_FIELD;
        this.horizontalVelocity = gameConstants.STOPPED;
        this.verticalVelocity = gameConstants.STOPPED;
        this.radius = gameConstants.BALL_RADIUS;
        this.color = color;
        this.draw = function () {
            gameConstants.CONTEXT.fillStyle = this.color;
            gameConstants.CONTEXT.beginPath();
            gameConstants.CONTEXT.arc(this.x, this.y, this.radius, gameConstants.BALL_START_ANGLE, gameConstants.BALL_END_ANGLE);
            gameConstants.CONTEXT.fill();
        };
        this.updatePosition = function (rightPaddle, leftPaddle) {
            this.x += this.horizontalVelocity / gameConstants.FPS;
            this.y += this.verticalVelocity / gameConstants.FPS;
            // -------------------- Start of ball collision code --------------------
 
            // Top wall collision.
            if ((this.y - this.radius) < gameConstants.TOP_WALL) {
                this.y = this.radius;
                this.verticalVelocity = -this.verticalVelocity;
            }
 
            // Bottom wall collision.
            if ((this.y + this.radius) > gameConstants.BOTTOM_WALL) {
                this.y = gameConstants.BOTTOM_WALL - this.radius;
                this.verticalVelocity = -this.verticalVelocity;
            }
 
            // Right paddle collison on the front side of the paddle.
            if ((this.x + this.radius) > rightPaddle.x) {
                if (this.y > rightPaddle.y) {
                    if (this.y < (rightPaddle.y + rightPaddle.height)) {
                        this.x = rightPaddle.x - this.radius;
                        this.horizontalVelocity = -this.horizontalVelocity;
                    }
                }
            }
 
            // Right paddle collision on the top side of the paddle.
            if ((this.x + this.radius) > rightPaddle.x) {
                if ((this.y + this.radius) > rightPaddle.y) {
                    if ((this.y + this.radius) < (rightPaddle.y + rightPaddle.height)) {
                        this.y = rightPaddle.y - this.radius;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
 
            // Right paddle collision on the bottom side of the paddle.
            if ((this.x + this.radius) > rightPaddle.x) {
                if ((this.y - this.radius) < (rightPaddle.y + rightPaddle.height)) {
                    if ((this.y - this.radius) > rightPaddle.y) {
                        this.y = (rightPaddle.y + rightPaddle.height) + this.radius;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
 
            // Left paddle collision on the front side of the paddle.
            if ((this.x - this.radius) < (leftPaddle.x + leftPaddle.width)) {
                if (this.y > leftPaddle.y) {
                    if (this.y < (leftPaddle.y + leftPaddle.height)) {
                        this.x = (leftPaddle.x + leftPaddle.width) + this.radius;
                        this.horizontalVelocity = -this.horizontalVelocity;
                    }
                }
            }
 
            // Left paddle collision on the top side of the paddle.
            if ((this.x - this.radius) < (leftPaddle.x + leftPaddle.width)) {
                if ((this.y + this.radius) > leftPaddle.y) {
                    if ((this.y + this.radius) < (leftPaddle.y + leftPaddle.height)) {
                        this.y = leftPaddle.y - this.radius;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
 
            // Left paddle collision on the bottom side of the paddle.
            if ((this.x - this.radius) < (leftPaddle.x + leftPaddle.width)) {
                if ((this.y - this.radius) < (leftPaddle.y + leftPaddle.height)) {
                    if ((this.y - this.radius) > leftPaddle.y) {
                        this.y = (leftPaddle.y + leftPaddle.height) + this.radius;
                        this.verticalVelocity = -this.verticalVelocity;
                    }
                }
            }
 
            // ******************** End of ball collision code ********************
 
            // Restart at center when the ball leaves the field and score a point for the paddle that scored.
      
            // When the ball goes past the right paddle...
            if ((this.x - this.radius) > gameConstants.RIGHT_WALL) {
                // ... restart at the center of the field and mark a point for the left paddle.
                this.x = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.y = gameConstants.VERTICAL_CENTER_OF_FIELD;
                leftPaddle.score++;
            }
      
            // When the ball goes past the left paddle...
            if ((this.x + this.radius) < gameConstants.LEFT_WALL) {
                // ... restart at the center of the field and mark a point for the right paddle.
                this.x = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.y = gameConstants.VERTICAL_CENTER_OF_FIELD;
                rightPaddle.score++;
            }
        };
    };
    return Ball;
});