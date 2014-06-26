define(function () {
    // Get the canvas element and store it in a variable.
    var field = document.getElementById("field");
    
    var gameConstants = {
        FIELD: field,
        CONTEXT: field.getContext("2d"),
        FPS: 60,
        
        RIGHT_PADDLE_X_POS: 670,
        RIGHT_PADDLE_Y_POS: 175,
        RIGHT_HORIZONTAL_SCORE_POS: 507.5,
        RIGHT_VERTICAL_SCORE_POS: 70,
        RIGHT_PADDLE_VELOCITY: 315,
        
        LEFT_PADDLE_X_POS: 0,
        LEFT_PADDLE_Y_POS: 175,
        LEFT_HORIZONTAL_SCORE_POS: 160,
        LEFT_VERTICAL_SCORE_POS: 70,
        LEFT_PADDLE_VELOCITY: 315,
        
        IS_AI: true,
        IS_NOT_AI: false,
        
        HORIZONTAL_CENTER_OF_FIELD: 350,
        VERTICAL_CENTER_OF_FIELD: 250,
        BALL_RADIUS: 15,
        BALL_START_ANGLE: 0,
        BALL_END_ANGLE: 2 * Math.PI,
        BALL_VELOCITY: 400,
        
        POINTS_TO_WIN: 10,
        
        LEFT_BUTTON_INSTRUCTIONS_X_POS: 50,
        LEFT_BUTTON_INSTRUCTIONS_Y_POS: 90,
        RIGHT_BUTTON_INSTRUCTIONS_X_POS: 400,
        RIGHT_BUTTON_INSTRUCTIONS_Y_POS: 90,
        
        SPACEBAR_CODE: 32,
        UP_ARROW_CODE: 38,
        W_CODE: 87,
        A_CODE: 65,
        SINGLE_QUOTE_CODE: 222,
        
        DOWN_ARROW_CODE: 40,
        S_CODE: 83,
        Z_CODE: 90,
        FORWARD_SLASH_CODE: 191,
        
        ONE_CODE: 49,
        ONE_NUMPAD_CODE: 97,
        TWO_CODE: 50,
        TWO_NUMPAD_CODE: 98,
        
        PADDLE_WIDTH: 30,
        PADDLE_HEIGHT: 150,
        ORIGIN: 0,
        TOP_WALL: 0,
        BOTTOM_WALL: field.height,
        RIGHT_WALL: field.width,
        LEFT_WALL: 0,
        COLOR_PRE_GAME: "gray",
        COLOR: "white",
        TEXT_FONT: "15px Courier",
        SCORE_FONT: "50px Courier",
        STOPPED: 0,
        MILLESECONDS: 1000
    };
    return gameConstants;
});