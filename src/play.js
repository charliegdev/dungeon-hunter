/* globals contain */
import { bump } from 'globals';
import { explorer, blobs, healthBar, treasure, door, message } from "setup";
const dungeonConfine = {
    x: 28,
    y: 10,
    width: 488,
    height: 480
};

let isGameOver = false;
function play() {
    "use strict";

    let collision = contain(explorer, dungeonConfine);

    if (collision) {
        if (collision.has("left") || collision.has("right")) {
            explorer.vx = 0;
        }
        if (collision.has("up") || collision.has("down")) {
            explorer.vy = 0;
        }
        return;
    }

    explorer.x += explorer.vx;
    explorer.y += explorer.vy;

    let explorerHit = false;
    blobs.forEach((blob, index, array) => {
        blob.y += blob.vy;

        const blobHitsWall = contain(blob, dungeonConfine);
        if (blobHitsWall) {
            if (blobHitsWall.has("top") || blobHitsWall.has("bottom")) {
                blob.vy *= -1;
            }
        }

        if (bump.hitTestRectangle(explorer, blob)) {
            explorerHit = true;
        }
    });

    if (explorerHit) {
        explorer.alpha = 0.5;
        healthBar.outer.width -= 1;
    } else {
        explorer.alpha = 1;
    }

    if (bump.hitTestRectangle(explorer, treasure)) {
        treasure.x = explorer.x + 8;
        treasure.y = explorer.y + 8;
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
