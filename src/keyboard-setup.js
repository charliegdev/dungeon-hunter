/* global keyboard, explorer */
/* exported setupKeyboard */
function setupKeyboard() {
    "use strict";
    // Add keyboard control
    const left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40),
        explorerSpeed = 2;

    left.press = function() {
        explorer.vx -= explorerSpeed;
    };

    left.release = function() {
        explorer.vx += explorerSpeed;
    };

    right.press = function() {
        explorer.vx += explorerSpeed;
    };

    right.release = function() {
        explorer.vx -= explorerSpeed;
    };

    up.press = function() {
        explorer.vy -= explorerSpeed;
    };

    up.release = function() {
        explorer.vy += explorerSpeed;
    };

    down.press = function() {
        explorer.vy += explorerSpeed;
    };

    down.release = function() {
        explorer.vy -= explorerSpeed;
    };
}
