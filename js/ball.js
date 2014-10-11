define(["global_constants"], function (globalConstants) {
    var Ball = function () {
        // Set the ball to the center of the field and make it stopped at the beginning.
        this.xPos = globalConstants.HORIZONTAL_CENTER_OF_FIELD;
        this.yPos = globalConstants.VERTICAL_CENTER_OF_FIELD;
        this.horizontalVelocity = globalConstants.STOPPED;
        this.verticalVelocity = globalConstants.STOPPED;
        // Draw the ball with the proper positions and dimensions.
        this.draw = function () {
            globalConstants.CONTEXT.beginPath();
            globalConstants.CONTEXT.arc(this.xPos, this.yPos, globalConstants.BALL_RADIUS, globalConstants.BALL_START_ANGLE, globalConstants.BALL_END_ANGLE);
            globalConstants.CONTEXT.fill();
        };
        // Update the ball's position depending on velocity. Also do collision detection for the ball.
        this.updatePosition = function (rightPaddle, leftPaddle) {
            // Update position.
            this.xPos += this.horizontalVelocity / globalConstants.FPS;
            this.yPos += this.verticalVelocity / globalConstants.FPS;
            
            // -------------------- Start of ball collision code --------------------
            
            // Ball collision constants (these can't go into globalConstants because they use objects unknown to globalConstants, i.e., this, rightPaddle and leftPaddle)
            var TOP_OF_BALL = this.yPos - globalConstants.BALL_RADIUS;
            var BOTTOM_OF_BALL = this.yPos + globalConstants.BALL_RADIUS;
            var RIGHT_SIDE_OF_BALL = this.xPos + globalConstants.BALL_RADIUS;
            var LEFT_SIDE_OF_BALL = this.xPos - globalConstants.BALL_RADIUS;
            var FRONT_SIDE_OF_RIGHT_PADDLE = rightPaddle.xPos;
            var TOP_OF_RIGHT_PADDLE = rightPaddle.yPos;
            var BOTTOM_OF_RIGHT_PADDLE = rightPaddle.yPos + rightPaddle.height;
            var FRONT_SIDE_OF_LEFT_PADDLE = leftPaddle.xPos + leftPaddle.width;
            var TOP_OF_LEFT_PADDLE = leftPaddle.yPos;
            var BOTTOM_OF_LEFT_PADDLE = leftPaddle.yPos + leftPaddle.height;
            
            // Top wall collision
            if (TOP_OF_BALL < globalConstants.TOP_WALL) {
                this.yPos = globalConstants.TOP_WALL + globalConstants.BALL_RADIUS;
                this.verticalVelocity = -this.verticalVelocity;
            }
            
            // Bottom wall collision
            if (BOTTOM_OF_BALL > globalConstants.BOTTOM_WALL) {
                this.yPos = globalConstants.BOTTOM_WALL - globalConstants.BALL_RADIUS;
                this.verticalVelocity = -this.verticalVelocity;
            }
            
            // Right paddle collision (when the ball goes past the front side of the paddle)
            if (RIGHT_SIDE_OF_BALL > FRONT_SIDE_OF_RIGHT_PADDLE) {
                // Front side collision
                if (this.yPos > TOP_OF_RIGHT_PADDLE && this.yPos < BOTTOM_OF_RIGHT_PADDLE) {
                    this.xPos = FRONT_SIDE_OF_RIGHT_PADDLE - globalConstants.BALL_RADIUS;
                    this.horizontalVelocity = -this.horizontalVelocity;
                }
                
                // Top side collision
                if (BOTTOM_OF_BALL > TOP_OF_RIGHT_PADDLE && this.yPos < TOP_OF_RIGHT_PADDLE && BOTTOM_OF_BALL < BOTTOM_OF_RIGHT_PADDLE) {
                    this.yPos = TOP_OF_RIGHT_PADDLE - globalConstants.BALL_RADIUS;
                    this.verticalVelocity = -this.verticalVelocity;
                }
                
                // Bottom side collision
                if (TOP_OF_BALL < BOTTOM_OF_RIGHT_PADDLE && this.yPos > BOTTOM_OF_RIGHT_PADDLE && TOP_OF_BALL > TOP_OF_RIGHT_PADDLE) {
                    this.yPos = BOTTOM_OF_RIGHT_PADDLE + globalConstants.BALL_RADIUS;
                    this.verticalVelocity = -this.verticalVelocity;
                }
            }
            
            // Left paddle collision (when the ball goes past the front side of the paddle)
            if (LEFT_SIDE_OF_BALL < FRONT_SIDE_OF_LEFT_PADDLE) {
                // Front side collision
                if (this.yPos > TOP_OF_LEFT_PADDLE && this.yPos < BOTTOM_OF_LEFT_PADDLE) {
                    this.xPos = FRONT_SIDE_OF_LEFT_PADDLE + globalConstants.BALL_RADIUS;
                    this.horizontalVelocity = -this.horizontalVelocity;
                }
                
                // Top side collision
                if (BOTTOM_OF_BALL > TOP_OF_LEFT_PADDLE && this.yPos < TOP_OF_LEFT_PADDLE && BOTTOM_OF_BALL < BOTTOM_OF_LEFT_PADDLE) {
                    this.yPos = TOP_OF_LEFT_PADDLE - globalConstants.BALL_RADIUS;
                    this.verticalVelocity = -this.verticalVelocity;
                }
                
                // Bottom side collision
                if (TOP_OF_BALL < BOTTOM_OF_LEFT_PADDLE && this.yPos > BOTTOM_OF_LEFT_PADDLE && TOP_OF_BALL > TOP_OF_LEFT_PADDLE) {
                    this.yPos = BOTTOM_OF_LEFT_PADDLE + globalConstants.BALL_RADIUS;
                    this.verticalVelocity = -this.verticalVelocity;
                }
            }
            
            // ******************** End of ball collision code ********************
            
            // Restart at center when the ball leaves the field and score a point for the paddle that scored.
            
            // When the ball goes past the right paddle...
            if (LEFT_SIDE_OF_BALL > globalConstants.RIGHT_WALL) {
                // ... restart at the center of the field and mark a point for the left paddle.
                this.xPos = globalConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.yPos = globalConstants.VERTICAL_CENTER_OF_FIELD;
                leftPaddle.score += globalConstants.ONE_POINT;
            }
            
            // When the ball goes past the left paddle...
            if (RIGHT_SIDE_OF_BALL < globalConstants.LEFT_WALL) {
                // ... restart at the center of the field and mark a point for the right paddle.
                this.xPos = globalConstants.HORIZONTAL_CENTER_OF_FIELD;
                this.yPos = globalConstants.VERTICAL_CENTER_OF_FIELD;
                rightPaddle.score += globalConstants.ONE_POINT;
            }
        };
    };
    return Ball;
});