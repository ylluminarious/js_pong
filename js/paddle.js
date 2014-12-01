define(["global_constants", "global_variables"], function (globalConstants, globalVariables) {
    var Paddle = function (xPos, yPos, horizontalScorePos, verticalScorePos, ball) {
        // Set the paddle to the positions specified in the arguments, and make the paddle stopped in the beginning of a game.
        this.xPos = xPos;
        this.yPos = yPos;
        this.horizontalScorePos = horizontalScorePos;
        this.verticalScorePos = verticalScorePos;
        this.width = globalConstants.PADDLE_WIDTH;
        this.height = globalConstants.PADDLE_HEIGHT;
        this.velocity = globalConstants.STOPPED;
        this.score = globalVariables.score;
        this.ball = ball;
        // Draw the paddle with its score.
        this.draw = function () {
            globalConstants.CONTEXT.fillRect(this.xPos, this.yPos, this.width, this.height);
            globalConstants.CONTEXT.font = globalConstants.SCORE_FONT;
            globalConstants.CONTEXT.fillText(this.score, this.horizontalScorePos, this.verticalScorePos);
        };
        // Method to update the paddle's position.
        this.updatePosition = function () {
            // If the ball is not stopped, update position.
            if (this.ball.horizontalVelocity !== globalConstants.STOPPED && this.ball.verticalVelocity !== globalConstants.STOPPED) {
                // Update position.
                this.yPos += this.velocity / globalConstants.FPS;
                
                // If the paddle hits the top wall or the bottom wall... 
                if (this.yPos < globalConstants.TOP_WALL || (this.yPos + this.height) > globalConstants.BOTTOM_WALL) {
                    // ... stop the paddle.
                    this.velocity = globalConstants.STOPPED;
                }
            }
        };
        // Method to update the paddle's position when it's an AI.
        this.AIupdatePosition = function () {
            // -------------------- Start of AI code --------------------
            
            // AI constants; these can't go into globalConstants because they use the this object, which is unknown to globalConstants.
            var BOTTOM_OF_PADDLE = this.yPos + this.height;
            var CENTER_OF_PADDLE = this.yPos + this.height / globalConstants.HALVES;
            
            
            // If the ball is not stopped, update position and look through the code for the AI.
            if (this.ball.horizontalVelocity !== globalConstants.STOPPED && this.ball.verticalVelocity !== globalConstants.STOPPED) {
                // Update position.
                this.yPos += this.velocity / globalConstants.FPS;
                
                // If the ball's center is above the paddle's center...
                if (this.ball.yPos < CENTER_OF_PADDLE) {
                    // ... make the paddle go upwards.
                    this.velocity = -globalConstants.LEFT_PADDLE_VELOCITY;
                }
                
                // If the ball's center is below the paddle's center...
                if (this.ball.yPos > CENTER_OF_PADDLE) {
                    // ... make the paddle go downwards.
                    this.velocity = globalConstants.LEFT_PADDLE_VELOCITY;
                }
            
                // If the paddle is touching the top wall and the ball's center is above the paddle's center (so that the paddle will not stay stopped once the ball goes below it)...
                if (this.yPos < globalConstants.TOP_WALL && this.ball.yPos < CENTER_OF_PADDLE) {
                    // ... stop the paddle.
                    this.velocity = globalConstants.STOPPED;
                }
            
                // If the paddle is touching the bottom wall and the ball's center is above the paddle's center (again, so that the paddle will not stay stopped once the ball goes above it)...
                if (BOTTOM_OF_PADDLE > globalConstants.BOTTOM_WALL && this.ball.yPos > CENTER_OF_PADDLE) {
                    // ... stop the paddle.
                    this.velocity = globalConstants.STOPPED;
                }
            }
            
            // ******************** End of AI code ********************
        };
    };
    return Paddle;
});