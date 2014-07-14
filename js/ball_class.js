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
            
      // Ball collision constants (these can't go into gameConstants because they use objects unknown to gameConstants, i.e., this, rightPaddle and leftPaddle)
      const TOP_OF_BALL = this.yPos - gameConstants.BALL_RADIUS;
      const BOTTOM_OF_BALL = this.yPos + gameConstants.BALL_RADIUS;
      const RIGHT_SIDE_OF_BALL = this.xPos + gameConstants.BALL_RADIUS;
      const LEFT_SIDE_OF_BALL = this.xPos - gameConstants.BALL_RADIUS;
      const FRONT_SIDE_OF_RIGHT_PADDLE = rightPaddle.xPos;
      const TOP_OF_RIGHT_PADDLE = rightPaddle.yPos;
      const BOTTOM_OF_RIGHT_PADDLE = rightPaddle.yPos + rightPaddle.height;
      const FRONT_SIDE_OF_LEFT_PADDLE = leftPaddle.xPos + leftPaddle.width;
      const TOP_OF_LEFT_PADDLE = leftPaddle.yPos;
      const BOTTOM_OF_LEFT_PADDLE = leftPaddle.yPos + leftPaddle.height;
            
      // Top wall collision
      if (TOP_OF_BALL < gameConstants.TOP_WALL) {
        this.yPos = gameConstants.TOP_WALL + gameConstants.BALL_RADIUS;
        this.verticalVelocity = -this.verticalVelocity;
      }
            
      // Bottom wall collision
      if (BOTTOM_OF_BALL > gameConstants.BOTTOM_WALL) {
        this.yPos = gameConstants.BOTTOM_WALL - gameConstants.BALL_RADIUS;
        this.verticalVelocity = -this.verticalVelocity;
      }
            
      // Right paddle collison (when the ball goes past the front side of the paddle)
      if (RIGHT_SIDE_OF_BALL > FRONT_SIDE_OF_RIGHT_PADDLE) {
        // Front side collision
        if (this.yPos > TOP_OF_RIGHT_PADDLE && this.yPos < BOTTOM_OF_RIGHT_PADDLE) {
          this.xPos = FRONT_SIDE_OF_RIGHT_PADDLE - gameConstants.BALL_RADIUS;
          this.horizontalVelocity = -this.horizontalVelocity;
        }
                
        // Top side collision
        if (BOTTOM_OF_BALL > TOP_OF_RIGHT_PADDLE && this.yPos < TOP_OF_RIGHT_PADDLE && BOTTOM_OF_BALL < BOTTOM_OF_RIGHT_PADDLE) {
          this.yPos = TOP_OF_RIGHT_PADDLE - gameConstants.BALL_RADIUS;
          this.verticalVelocity = -this.verticalVelocity;
        }
                
        // Bottom side collision
        if (TOP_OF_BALL < BOTTOM_OF_RIGHT_PADDLE && this.yPos > BOTTOM_OF_RIGHT_PADDLE && TOP_OF_BALL > TOP_OF_RIGHT_PADDLE) {
          this.yPos = BOTTOM_OF_RIGHT_PADDLE + gameConstants.BALL_RADIUS;
          this.verticalVelocity = -this.verticalVelocity;
        }
      }
            
      // Left paddle collision (when the ball goes past the front side of the paddle)
      if (LEFT_SIDE_OF_BALL < FRONT_SIDE_OF_LEFT_PADDLE) {
        // Front side collision
        if (this.yPos > TOP_OF_LEFT_PADDLE && this.yPos < BOTTOM_OF_LEFT_PADDLE) {
          this.xPos = FRONT_SIDE_OF_LEFT_PADDLE + gameConstants.BALL_RADIUS;
          this.horizontalVelocity = -this.horizontalVelocity;
        }
                
        // Top side collision
        if (BOTTOM_OF_BALL > TOP_OF_LEFT_PADDLE && this.yPos < TOP_OF_LEFT_PADDLE && BOTTOM_OF_BALL < BOTTOM_OF_LEFT_PADDLE) {
          this.yPos = TOP_OF_LEFT_PADDLE - gameConstants.BALL_RADIUS;
          this.verticalVelocity = -this.verticalVelocity;
        }
                
        // Bottom side collision
        if (TOP_OF_BALL < BOTTOM_OF_LEFT_PADDLE && this.yPos > BOTTOM_OF_LEFT_PADDLE && TOP_OF_BALL > TOP_OF_LEFT_PADDLE) {
          this.yPos = BOTTOM_OF_LEFT_PADDLE + gameConstants.BALL_RADIUS;
          this.verticalVelocity = -this.verticalVelocity;
        }
      }
            
      // ******************** End of ball collision code ********************
            
      // Restart at center when the ball leaves the field and score a point for the paddle that scored.
            
      // When the ball goes past the right paddle...
      if (LEFT_SIDE_OF_BALL > gameConstants.RIGHT_WALL) {
        // ... restart at the center of the field and mark a point for the left paddle.
        this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
        this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
        leftPaddle.score++;
      }
            
      // When the ball goes past the left paddle...
      if (RIGHT_SIDE_OF_BALL < gameConstants.LEFT_WALL) {
        // ... restart at the center of the field and mark a point for the right paddle.
        this.xPos = gameConstants.HORIZONTAL_CENTER_OF_FIELD;
        this.yPos = gameConstants.VERTICAL_CENTER_OF_FIELD;
        rightPaddle.score++;
      }
    };
  };
  return Ball;
});