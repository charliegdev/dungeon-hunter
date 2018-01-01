/* globals contain */
import { bump } from 'globals';
import { adventuress, blobs, healthBar, treasure, door, message } from "setup";
const dungeonConfine = {
    x: 28,
    y: 10,
    width: 488,
    height: 480
};

let isGameOver = false;
function play() {
    "use strict";

    let collision = contain(adventuress, dungeonConfine);

    if (collision) {
        if (collision.has("left") || collision.has("right")) {
            adventuress.vx = 0;
        }
        if (collision.has("up") || collision.has("down")) {
            adventuress.vy = 0;
        }
        return;
    }

    adventuress.x += adventuress.vx;
    adventuress.y += adventuress.vy;

    let adventuressHit = false;
    blobs.forEach((blob, index, array) => {
        blob.y += blob.vy;

        const blobHitsWall = contain(blob, dungeonConfine);
        if (blobHitsWall) {
            if (blobHitsWall.has("top") || blobHitsWall.has("bottom")) {
                blob.vy *= -1;
            }
        }

        if (bump.hitTestRectangle(adventuress, blob)) {
            adventuressHit = true;
        }
    });

    if (adventuressHit) {
        adventuress.alpha = 0.5;
        healthBar.outer.width -= 1;
    } else {
        adventuress.alpha = 1;
    }

    if (bump.hitTestRectangle(adventuress, treasure)) {
        treasure.x = adventuress.x + 8;
        treasure.y = adventuress.y + 8;
    }

    if (bump.hitTestRectangle(treasure, door)) {
        // game over
        message.text = "You won!";
        isGameOver = true;
    }

    if (healthBar.outer.width < 0) {
        message.text = "You lost!";
        isGameOver = true;
    }
}

export { play, isGameOver };
