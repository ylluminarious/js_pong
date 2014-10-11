define(["global_constants", "global_variables", "click_toggle"], function (globalConstants, globalVariables, clickToggle) {
    var Game = function (ball, rightPaddle, leftPaddle) {
        // This method will clear the game field before doing anything else in the game loop, so that previously drawn game objects are erased each frame.
        this.clear = function () {
            globalConstants.CONTEXT.clearRect(globalConstants.ORIGIN, globalConstants.ORIGIN, globalConstants.RIGHT_WALL, globalConstants.BOTTOM_WALL);
        };
        // Draws the objects of the game, the text of the victory and opening scenes, and the game's halfway line.
        this.draw = function () {
            globalConstants.CONTEXT.fillStyle = globalVariables.color;
            ball.draw();
            rightPaddle.draw();
            leftPaddle.draw();
            for (var y_pos = globalConstants.HALFWAY_LINE_Y_POS; y_pos < globalConstants.BOTTOM_WALL; y_pos += globalConstants.HALFWAY_LINE_STEPS) {
                globalConstants.CONTEXT.fillRect(globalConstants.HALFWAY_LINE_X_POS,
                    y_pos + globalConstants.HOW_MUCH_TO_STRETCH_STEPS,
                    globalConstants.STEP_WIDTH,
                    globalConstants.STEP_HEIGHT
                );
            }
            if (globalVariables.whichGame === "opening scene" || globalVariables.whichGame === "victory scene") {
                this.writeText();
            }
        };
        // Updates the positions of the game objects, and does so differently depending on which game scene is current. Also will reset all game objects in the victory scene.
        this.update = function () {
            if (!globalVariables.paused) {
                ball.updatePosition(rightPaddle, leftPaddle);
                rightPaddle.updatePosition();
                if (globalVariables.whichGame === "opening scene") {
                    // do nothing
                } else if (globalVariables.whichGame === "one player") {
                    leftPaddle.AIupdatePosition();
                } else if (globalVariables.whichGame === "two player") {
                    leftPaddle.updatePosition();
                }
                if (rightPaddle.score === globalConstants.POINTS_TO_WIN || leftPaddle.score === globalConstants.POINTS_TO_WIN) {
                    globalVariables.whichGame = "victory scene";
                    ball.xPos = globalConstants.HORIZONTAL_CENTER_OF_FIELD;
                    ball.yPos = globalConstants.VERTICAL_CENTER_OF_FIELD;
                    rightPaddle.yPos = globalConstants.RIGHT_PADDLE_Y_POS;
                    leftPaddle.yPos = globalConstants.LEFT_PADDLE_Y_POS;
                    ball.horizontalVelocity = globalConstants.STOPPED;
                    ball.verticalVelocity = globalConstants.STOPPED;
                    rightPaddle.velocity = globalConstants.STOPPED;
                    leftPaddle.velocity = globalConstants.STOPPED;
                }
            }
        };
        // Method that writes the instructional text telling you how to pick which game you want. Also writes "Winner!" text in the victory scene.
        this.writeText = function () {
            globalConstants.CONTEXT.fillStyle = "white";
            globalConstants.CONTEXT.font = globalConstants.TEXT_FONT;
            globalConstants.CONTEXT.fillText("Press \"1\" for single player",
                globalConstants.SINGLE_PLAYER_BUTTON_INSTRUCTIONS_X_POS,
                globalConstants.SINGLE_PLAYER_BUTTON_INSTRUCTIONS_Y_POS
            );
            globalConstants.CONTEXT.fillText("Press \"2\" for double player",
                globalConstants.DOUBLE_PLAYER_BUTTON_INSTRUCTIONS_X_POS,
                globalConstants.DOUBLE_PLAYER_BUTTON_INSTRUCTIONS_Y_POS
            );
            if (globalVariables.whichGame === "victory scene") {
                if (rightPaddle.score === globalConstants.POINTS_TO_WIN) {
                    globalConstants.CONTEXT.fillText("Winner!",
                    globalConstants.RIGHT_WINNER_X_POS,
                    globalConstants.RIGHT_WINNER_Y_POS
                );
                } else if (leftPaddle.score === globalConstants.POINTS_TO_WIN) {
                    globalConstants.CONTEXT.fillText("Winner!",
                    globalConstants.LEFT_WINNER_X_POS,
                    globalConstants.LEFT_WINNER_Y_POS
                );
                }
            }
        };
        // Method for the buttons of the game (uses jQuery to make them work).
        this.buttons = function () {
            // The play/pause button will toggle between clicks, changing the play symbol to pause symbol (and vice versa) and whether or not the game is paused.
            function pause () {
                if (globalVariables.whichGame !== "opening scene" && globalVariables.whichGame !== "victory scene") {
                    globalVariables.paused = true;
                    $("#pause_button").html("&#9658;");
                }
            }
            
            function play () {
                if (globalVariables.whichGame !== "opening scene" && globalVariables.whichGame !== "victory scene") {
                    globalVariables.paused = false;
                    $("#pause_button").html("&#10074;&#10074;");
                }
            }
            
            $("#pause_button").clickToggle(pause, play);
            
            // The restart button will set both players' points to 0 and reset all the game objects' positions, as well as their velocities.
            $("#restart_button").click(function () {
                if (globalVariables.whichGame !== "opening scene" && globalVariables.whichGame !== "victory scene" && !globalVariables.paused) {
                    rightPaddle.score = globalConstants.NO_POINTS;
                    leftPaddle.score = globalConstants.NO_POINTS;
                    ball.xPos = globalConstants.HORIZONTAL_CENTER_OF_FIELD;
                    ball.yPos = globalConstants.VERTICAL_CENTER_OF_FIELD;
                    rightPaddle.yPos = globalConstants.RIGHT_PADDLE_Y_POS;
                    leftPaddle.yPos = globalConstants.LEFT_PADDLE_Y_POS;
                    ball.horizontalVelocity = globalConstants.STOPPED;
                    ball.verticalVelocity = globalConstants.STOPPED;
                    rightPaddle.velocity = globalConstants.STOPPED;
                    leftPaddle.velocity = globalConstants.STOPPED;
                }
            });
        };
        // The tick method will be called on every tick of the game loop; it will run the steps of the game loop, check the buttons' conditions and update the stats bar.
        this.tick = function () {
            this.clear();
            this.update();
            this.draw();
            $("#game_mode").html(globalVariables.whichGame);
            $("#right_player_score").html(rightPaddle.score);
            $("#left_player_score").html(leftPaddle.score);
            if (globalVariables.whichGame !== "opening scene") {
                globalVariables.color = "white";
            }
        };
        this.buttons();
    };
    return Game;
});