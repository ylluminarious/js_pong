define(function () {
    // Get the canvas element and store it in a variable.
    var field = document.getElementById("field");
    
    var gameConstants = {
        // Constants for getting the canvas prepared to be worked with
        FIELD: field,
        CONTEXT: field.getContext("2d"),
        
        // Constants for the game loop
        FPS: 60,
        MILLESECONDS: 1000,
        
        // Right paddle constants
        RIGHT_PADDLE_X_POS: 670,
        RIGHT_PADDLE_Y_POS: 175,
        RIGHT_HORIZONTAL_SCORE_POS: 507.5,
        RIGHT_VERTICAL_SCORE_POS: 70,
        RIGHT_PADDLE_VELOCITY: 315,
        
        // Left paddle constants
        LEFT_PADDLE_X_POS: 0,
        LEFT_PADDLE_Y_POS: 175,
        LEFT_HORIZONTAL_SCORE_POS: 160,
        LEFT_VERTICAL_SCORE_POS: 70,
        LEFT_PADDLE_VELOCITY: 315,
        
        // Width and height of the paddles
        PADDLE_WIDTH: 30,
        PADDLE_HEIGHT: 150,
        
        // Ball constants
        HORIZONTAL_CENTER_OF_FIELD: 350,
        VERTICAL_CENTER_OF_FIELD: 250,
        BALL_RADIUS: 15,
        BALL_START_ANGLE: 0,
        BALL_END_ANGLE: 2 * Math.PI,
        BALL_VELOCITY: 400,
        
        // Velocity of stopped things is 0
        STOPPED: 0,
        
        // 10 points to win
        POINTS_TO_WIN: 10,
        NO_POINTS: 0,
        
        // Coordinate constants for the game mode instructions
        LEFT_BUTTON_INSTRUCTIONS_X_POS: 50,
        LEFT_BUTTON_INSTRUCTIONS_Y_POS: 90,
        RIGHT_BUTTON_INSTRUCTIONS_X_POS: 400,
        RIGHT_BUTTON_INSTRUCTIONS_Y_POS: 90,
        
        // Constants for the keys' codes
        SPACEBAR_CODE: 32,
        UP_ARROW_CODE: 38,
        DOWN_ARROW_CODE: 40,
        W_CODE: 87,
        S_CODE: 83,
        A_CODE: 65,
        Z_CODE: 90,
        SINGLE_QUOTE_CODE: 222,
        FORWARD_SLASH_CODE: 191,
        ONE_CODE: 49,
        ONE_NUMPAD_CODE: 97,
        TWO_CODE: 50,
        TWO_NUMPAD_CODE: 98,
        
        // Constants for dimensions of the playing field
        ORIGIN: 0,
        TOP_WALL: 0,
        BOTTOM_WALL: field.height,
        RIGHT_WALL: field.width,
        LEFT_WALL: 0,
        
        // Font constants
        TEXT_FONT: "15px Courier",
        SCORE_FONT: "50px Courier"
    };
    return gameConstants;
});