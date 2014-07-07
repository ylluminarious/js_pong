require(["ball_class", "paddle_class", "global_constants", "global_variables", "game_methods", "input"], function (Ball, Paddle, gameConstants, gameVariables, GameMethods, Input) {
    // Game objects
    var ball = new Ball(rightPaddle, leftPaddle);
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
    var gameMethods = new GameMethods(ball, rightPaddle, leftPaddle);
    var event = new Input(ball, rightPaddle, leftPaddle, gameInterval);
    
    // Interval that will make the game loop.
    var gameInterval = setInterval(gameTick, gameConstants.MILLESECONDS / gameConstants.FPS);
    
    // Keyboard events will run methods from the Input class.
    onkeydown = function () {
        event.keyDown();
    };
    onkeyup = function () {
        event.keyUp();
    };
    // Function to be run in every step of gameInterval.
    function gameTick () {
        gameMethods.tick();
    }
});