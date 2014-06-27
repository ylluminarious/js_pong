require(["ball_class", "paddle_class", "opening", "buttons", "global_constants", "global_variables", "game_methods", "input_handler"], function (Ball, Paddle, OpeningScene, buttons, gameConstants, gameVariables, GameMethods, InputHandler) {
    // Opening scene objects
    var openingBall = new Ball(gameConstants.COLOR_PRE_GAME);
    var openingRightPaddle = new Paddle(
        gameConstants.RIGHT_PADDLE_X_POS,
        gameConstants.RIGHT_PADDLE_Y_POS,
        gameConstants.RIGHT_HORIZONTAL_SCORE_POS,
        gameConstants.RIGHT_VERTICAL_SCORE_POS,
        gameConstants.COLOR_PRE_GAME
    );
    var openingLeftPaddle = new Paddle(
        gameConstants.LEFT_PADDLE_X_POS,
        gameConstants.LEFT_PADDLE_Y_POS,
        gameConstants.LEFT_HORIZONTAL_SCORE_POS,
        gameConstants.LEFT_VERTICAL_SCORE_POS,
        gameConstants.COLOR_PRE_GAME
    );
    
    // Game objects
    var ball = new Ball(gameConstants.COLOR);
    var rightPaddle = new Paddle(
        gameConstants.RIGHT_PADDLE_X_POS,
        gameConstants.RIGHT_PADDLE_Y_POS,
        gameConstants.RIGHT_HORIZONTAL_SCORE_POS,
        gameConstants.RIGHT_VERTICAL_SCORE_POS,
        gameConstants.COLOR
    );
    var leftPaddle = new Paddle(
        gameConstants.LEFT_PADDLE_X_POS,
        gameConstants.LEFT_PADDLE_Y_POS,
        gameConstants.LEFT_HORIZONTAL_SCORE_POS,
        gameConstants.LEFT_VERTICAL_SCORE_POS,
        gameConstants.COLOR
    );
    
    var gameMethods = new GameMethods(ball, rightPaddle, leftPaddle);
    var event = new InputHandler(ball, rightPaddle, leftPaddle);
    var opening = new OpeningScene(openingBall, openingRightPaddle, openingLeftPaddle);
    var gameInterval = setInterval(gameTick, gameConstants.MILLESECONDS / gameConstants.FPS);
    onkeydown = function () {
        event.keyDown();
    };
    onkeyup = function () {
        event.keyUp();
    };
    function gameTick () {
        if (gameVariables.whichGame === null) {
            opening.tick();
        } else {
            gameMethods.tick();
        }
    }
});