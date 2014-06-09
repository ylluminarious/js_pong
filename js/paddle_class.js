define(["constants"], function (constants) {
  return function (xPos, yPos, horizontalScorePos, verticalScorePos, color) {
    this.x = xPos;
    this.y = yPos;
    this.horizontalScorePos = horizontalScorePos;
    this.verticalScorePos = verticalScorePos;
    this.width = constants.PADDLE_WIDTH;
    this.height = constants.PADDLE_HEIGHT;
    this.velocity = constants.STOPPED;
    this.color = color;
    this.score = constants.SCORE;
    this.draw = function () {
      constants.CONTEXT.fillStyle = this.color;
      constants.CONTEXT.fillRect(this.x, this.y, this.width, this.height);
      constants.CONTEXT.font = "50px Courier";
      constants.CONTEXT.fillText(this.score, this.horizontalScorePos, this.verticalScorePos);
    };
    this.updatePosition = function () {
      this.y += this.velocity / constants.FPS;
      if ( this.y < constants.TOP_WALL || (this.y + this.height) > constants.BOTTOM_WALL ) {
        this.velocity = constants.STOPPED;
      }
    };
    this.AIupdatePosition = function (ball) {
      // Update position.
      this.y += this.velocity / constants.FPS;
 
      // -------------------- Start of AI code --------------------
    
      // If the ball's center is above the paddle's center...
      if ( ball.y < (this.y + this.height / 2) ) {
        // ... make the paddle go upwards.
        this.velocity = -constants.LEFT_PADDLE_VELOCITY;
      }
 
      // If the ball's center is below the paddle's center...
      if ( ball.y > (this.y + this.height / 2) ) {
        // ...make the paddle's go downwards.
        this.velocity = constants.LEFT_PADDLE_VELOCITY;
      }
 
      // If the paddle is touching the top wall...
      if ( this.y < constants.TOP_WALL && ball.y < (this.y + this.height / 2) ) {
        // ...stop the paddle.
        this.velocity = constants.STOPPED;
      }
 
      // If the paddle is touching the bottom wall...
      if ( (this.y + this.height) > constants.BOTTOM_WALL && ball.y > (this.y + this.height / 2) ) {
        // ...stop the paddle.
        this.velocity = constants.STOPPED;
      }
    
      // ******************** End of AI code ********************
    };
  }
});