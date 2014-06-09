define(["constants"], function (constants) {
  return function (color) {
    this.x = constants.HORIZONTAL_CENTER_OF_FIELD;
    this.y = constants.VERTICAL_CENTER_OF_FIELD;
    this.horizontalVelocity = constants.STOPPED;
    this.verticalVelocity = constants.STOPPED;
    this.radius = constants.BALL_RADIUS;
    this.color = color;
    this.draw = function () {
      constants.CONTEXT.fillStyle = this.color;
      constants.CONTEXT.beginPath();
      constants.CONTEXT.arc( this.x, this.y, this.radius, constants.BALL_START_ANGLE, constants.BALL_END_ANGLE );
      constants.CONTEXT.fill();
    };
    this.updatePosition = function (rightPaddle, leftPaddle) {
      this.x += this.horizontalVelocity / constants.FPS;
      this.y += this.verticalVelocity / constants.FPS;
      // -------------------- Start of ball collision code --------------------
 
      // Top wall collision.
      if ((this.y - this.radius) < constants.TOP_WALL) {
        this.y = this.radius;
        this.verticalVelocity = -this.verticalVelocity;
      }
 
      // Bottom wall collision.
      if ((this.y + this.radius) > constants.BOTTOM_WALL) {
        this.y = constants.BOTTOM_WALL - this.radius;
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
      if ((this.x - this.radius) > constants.RIGHT_WALL) {
        // ... restart at the center of the field and mark a point for the left paddle.
        this.x = constants.HORIZONTAL_CENTER_OF_FIELD;
        this.y = constants.VERTICAL_CENTER_OF_FIELD;
        leftPaddle.score++;
      }
      
      // When the ball goes past the left paddle...
      if ((this.x + this.radius) < constants.LEFT_WALL) {
        // restart at the center of the field and mark a point for the right paddle.
        this.x = constants.HORIZONTAL_CENTER_OF_FIELD;
        this.y = constants.VERTICAL_CENTER_OF_FIELD;
        rightPaddle.score++;
      }
    };
  }
});