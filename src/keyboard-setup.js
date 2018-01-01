/* globals keyboard */
import { adventuress } from 'setup';

function setupKeyboard() {
    "use strict";
    // Add keyboard control
    const left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40),
        adventuressSpeed = 2;

    left.press = function () {
        adventuress.playAnimation(adventuress.states.walkLeft);
        adventuress.vx = -3;
        adventuress.vy = 0;
    };

    left.release = function () {
        if (!right.isDown && adventuress.vy === 0) {
            adventuress.vx = 0;
            adventuress.show(adventuress.states.left);
        }
    };

    right.press = function () {
        adventuress.playAnimation(adventuress.states.walkRight);
        adventuress.vx = 3;
        adventuress.vy = 0;
    };

    right.release = function () {
        if (!left.isDown && adventuress.vy === 0) {
            adventuress.vx = 0;
            adventuress.show(adventuress.states.right);
        }
    };

    up.press = function () {
        adventuress.playAnimation(adventuress.states.walkUp);
        adventuress.vy = -3;
        adventuress.vx = 0;
    };

    up.release = function () {
        if (!down.isDown && adventuress.vx === 0) {
            adventuress.vy = 0;
            adventuress.show(adventuress.states.up);
        }
    };

    down.press = function () {
        adventuress.playAnimation(adventuress.states.walkDown);
        adventuress.vy = 3;
        adventuress.vx = 0;
    };

    down.release = function () {
        if (!up.isDown && adventuress.vx === 0) {
            adventuress.vy = 0;
            adventuress.show(adventuress.states.down);
        }
    };
}

export { setupKeyboard };
