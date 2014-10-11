require(["ball", "paddle", "global_constants", "game", "input"], function (Ball, Paddle, globalConstants, Game, Input) {
    // Game objects
    var ball = new Ball();
    var rightPaddle = new Paddle(
        globalConstants.RIGHT_PADDLE_X_POS,
        globalConstants.RIGHT_PADDLE_Y_POS,
        globalConstants.RIGHT_HORIZONTAL_SCORE_POS,
        globalConstants.RIGHT_VERTICAL_SCORE_POS,
        ball
    );
    var leftPaddle = new Paddle(
        globalConstants.LEFT_PADDLE_X_POS,
        globalConstants.LEFT_PADDLE_Y_POS,
        globalConstants.LEFT_HORIZONTAL_SCORE_POS,
        globalConstants.LEFT_VERTICAL_SCORE_POS,
        ball
    );
    
    // New instances of GameMethods and Input.
    var gameMethods = new Game(ball, rightPaddle, leftPaddle);
    var event = new Input(ball, rightPaddle, leftPaddle, gameInterval);
    
    // Interval that will make the game loop.
    var gameInterval = setInterval(gameTick, globalConstants.MILLESECONDS / globalConstants.FPS);
    
    // Keyboard events will run methods from the Input class.
    window.onkeydown = function (inputEvent) {
        event.keyDown(inputEvent);
    };
    window.onkeyup = function (inputEvent) {
        event.keyUp(inputEvent);
    };
    // Function to be run in every step of gameInterval.
    function gameTick () {
        gameMethods.tick();
    }
});