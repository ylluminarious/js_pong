define(["global_constants", "global_variables"], function (gameConstants, gameVariables) {
    var Paddle = function (xPos, yPos, horizontalScorePos, verticalScorePos, ball) {
        // Set the paddle to the positions specified in the arguments, and make the paddle stopped in the beginning of a game.
        this.xPos = xPos;
        this.yPos = yPos;
        this.horizontalScorePos = horizontalScorePos;
        this.verticalScorePos = verticalScorePos;
        this.width = gameConstants.PADDLE_WIDTH;
        this.height = gameConstants.PADDLE_HEIGHT;
        this.velocity = gameConstants.STOPPED;
        this.score = gameVariables.score;
        // Draw the paddle with its score.
        this.draw = function () {
            gameConstants.CONTEXT.fillRect(this.xPos, this.yPos, this.width, this.height);
            gameConstants.CONTEXT.font = gameConstants.SCORE_FONT;
            gameConstants.CONTEXT.fillText(this.score, this.horizontalScorePos, this.verticalScorePos);
        };
        // Method to update the paddle's position.
        this.updatePosition = function () {
            // If the ball is not stopped, update position.
            if (ball.horizontalVelocity !== gameConstants.STOPPED && ball.verticalVelocity !== gameConstants.STOPPED) {
                // Update position.
                this.yPos += this.velocity / gameConstants.FPS;
                
                // If the paddle hits the top wall or the bottom wall... 
                if ( this.yPos < gameConstants.TOP_WALL || (this.yPos + this.height) > gameConstants.BOTTOM_WALL ) {
                    // ... stop the paddle.
                    this.velocity = gameConstants.STOPPED;
                }
            }
        };
        // Method to update the paddle's position when it's an AI.
        this.AIupdatePosition = function () {
            // -------------------- Start of AI code --------------------
            
            // AI constants; these can't go into gameConstants because they use the this object, which is unknown to gameConstants.
            const CENTER_OF_PADDLE = this.yPos + this.height / 2;
            const BOTTOM_OF_PADDLE = this.yPos + this.height;
            
            
            // If the ball is not stopped, update position and look through the code for the AI.
            if (ball.horizontalVelocity !== gameConstants.STOPPED && ball.verticalVelocity !== gameConstants.STOPPED) {
                // Update position.
                this.yPos += this.velocity / gameConstants.FPS;
                
                // If the ball's center is above the paddle's center...
                if ( ball.yPos < CENTER_OF_PADDLE ) {
                    // ... make the paddle go upwards.
                    this.velocity = -gameConstants.LEFT_PADDLE_VELOCITY;
                }
                
                // If the ball's center is below the paddle's center...
                if ( ball.yPos > CENTER_OF_PADDLE ) {
                    // ... make the paddle's go downwards.
                    this.velocity = gameConstants.LEFT_PADDLE_VELOCITY;
                }
            
                // If the paddle is touching the top wall and the ball's center is above the paddle's center (so that the paddle will not stay stopped once the ball goes below it)...
                if ( this.yPos < gameConstants.TOP_WALL && ball.yPos < CENTER_OF_PADDLE ) {
                    // ... stop the paddle.
                    this.velocity = gameConstants.STOPPED;
                }
            
                // If the paddle is touching the bottom wall and the ball's center is above the paddle's center (again, so that the paddle will not stay stopped once the ball goes above it)...
                if ( BOTTOM_OF_PADDLE > gameConstants.BOTTOM_WALL && ball.yPos > CENTER_OF_PADDLE ) {
                    // ... stop the paddle.
                    this.velocity = gameConstants.STOPPED;
                }
            }
            
            // ******************** End of AI code ********************
        };
    };
    return Paddle;
});