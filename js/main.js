require(["ball_class", "paddle_class", "global_constants", "game_class", "input"], function (Ball, Paddle, gameConstants, Game, Input) {
    // Game objects
    var ball = new Ball();
    var rightPaddle = new Paddle(
        gameConstants.RIGHT_PADDLE_X_POS,
        gameConstants.RIGHT_PADDLE_Y_POS,
        gameConstants.RIGHT_HORIZONTAL_SCORE_POS,
        gameConstants.RIGHT_VERTICAL_SCORE_POS,
        ball
    );
    var leftPaddle = new Paddle(
        gameConstants.LEFT_PADDLE_X_POS,
        gameConstants.LEFT_PADDLE_Y_POS,
        gameConstants.LEFT_HORIZONTAL_SCORE_POS,
        gameConstants.LEFT_VERTICAL_SCORE_POS,
        ball
    );
    
    // New instances of GameMethods and Input.
    var gameMethods = new Game(ball, rightPaddle, leftPaddle);
    var event = new Input(ball, rightPaddle, leftPaddle, gameInterval);
    
    // Interval that will make the game loop.
    var gameInterval = setInterval(gameTick, gameConstants.MILLESECONDS / gameConstants.FPS);
    
    // Keyboard events will run methods from the Input class.
    onkeydown = function (inputEvent) {
        event.keyDown(inputEvent);
    };
    onkeyup = function (inputEvent) {
        event.keyUp(inputEvent);
    };
    // Function to be run in every step of gameInterval.
    function gameTick () {
        gameMethods.tick();
    }
});