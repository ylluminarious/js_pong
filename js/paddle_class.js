define(["global_constants", "global_variables"], function (gameConstants, gameVariables) {
    var Paddle = function (xPos, yPos, horizontalScorePos, verticalScorePos) {
        this.x = xPos;
        this.y = yPos;
        this.horizontalScorePos = horizontalScorePos;
        this.verticalScorePos = verticalScorePos;
        this.width = gameConstants.PADDLE_WIDTH;
        this.height = gameConstants.PADDLE_HEIGHT;
        this.velocity = gameConstants.STOPPED;
        this.score = gameVariables.score;
        this.draw = function () {
            gameConstants.CONTEXT.fillStyle = gameVariables.color;
            gameConstants.CONTEXT.fillRect(this.x, this.y, this.width, this.height);
            gameConstants.CONTEXT.font = gameConstants.SCORE_FONT;
            gameConstants.CONTEXT.fillText(this.score, this.horizontalScorePos, this.verticalScorePos);
        };
        this.updatePosition = function () {
            this.y += this.velocity / gameConstants.FPS;
            if ( this.y < gameConstants.TOP_WALL || (this.y + this.height) > gameConstants.BOTTOM_WALL ) {
                this.velocity = gameConstants.STOPPED;
            }
        };
        this.AIupdatePosition = function (ball) {
            // Update position.
            this.y += this.velocity / gameConstants.FPS;
            
            // -------------------- Start of AI code --------------------
            
            // If the ball's center is above the paddle's center...
            if ( ball.y < (this.y + this.height / 2) ) {
                // ... make the paddle go upwards.
                this.velocity = -gameConstants.LEFT_PADDLE_VELOCITY;
            }
            
            // If the ball's center is below the paddle's center...
            if ( ball.y > (this.y + this.height / 2) ) {
                // ...make the paddle's go downwards.
                this.velocity = gameConstants.LEFT_PADDLE_VELOCITY;
            }
            
            // If the paddle is touching the top wall...
            if ( this.y < gameConstants.TOP_WALL && ball.y < (this.y + this.height / 2) ) {
                // ...stop the paddle.
                this.velocity = gameConstants.STOPPED;
            }
            
            // If the paddle is touching the bottom wall...
            if ( (this.y + this.height) > gameConstants.BOTTOM_WALL && ball.y > (this.y + this.height / 2) ) {
                // ...stop the paddle.
                this.velocity = gameConstants.STOPPED;
            }
            
            // ******************** End of AI code ********************
        };
    };
    return Paddle;
});