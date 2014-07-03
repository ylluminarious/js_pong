require(["ball_class", "paddle_class", "opening_scene", "global_constants", "global_variables", "game_methods", "input_handler"], function (Ball, Paddle, OpeningScene, gameConstants, gameVariables, GameMethods, InputHandler) {
    // Game objects
    var ball = new Ball(gameVariables.color);
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
    
    // New instances of GameMethods, InputHandler, and OpeningScene.
    var gameMethods = new GameMethods(ball, rightPaddle, leftPaddle);
    var event = new InputHandler(ball, rightPaddle, leftPaddle, gameInterval);
    var opening = new OpeningScene(ball, rightPaddle, leftPaddle);
    
    // Interval that will make the game loop.
    var gameInterval = setInterval(gameTick, gameConstants.MILLESECONDS / gameConstants.FPS);
    
    // Keyboard events will run methods from InputHandler, and clicking-button events will run methods from GameMethods.
    onkeydown = function () {
        event.keyDown();
    };
    onkeyup = function () {
        event.keyUp();
    };
    gameMethods.buttons();
    
    // Function to be run in every step of gameInterval.
    function gameTick () {
        if (gameVariables.whichGame === "opening scene") {
            opening.tick();
            gameVariables.color = "gray";
        } else {
            gameMethods.tick();
            gameVariables.color = "white";
        }
    }
});