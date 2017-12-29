/* globals contain */
import { Container, Sprite, Point, Graphics, PIXIText } from './globals.js';
import { stage, renderer } from './app.js';
import { setupKeyboard } from './keyboard-setup.js';
let dungeon, explorer, treasure, door, gameScene, gameOverScene;

function setup(loader, resources) {
    "use strict";

    // Add scenes
    gameScene = new Container();
    gameOverScene = new Container();

    stage.addChild(gameScene);
    stage.addChild(gameOverScene);

    gameOverScene.visible = false;

    // Add sprites     
    const spritesheet = resources["assets/spritesheets/treasureHunter.json"].textures;
    dungeon = new Sprite(spritesheet["dungeon.png"]);
    explorer = new Sprite(spritesheet["explorer.png"]);
    treasure = new Sprite(spritesheet["treasure.png"]);
    door = new Sprite(spritesheet["door.png"]);

    gameScene.addChild(dungeon);
    gameScene.addChild(explorer);
    gameScene.addChild(treasure);
    gameScene.addChild(door);

    explorer.position = new Point(68, stage.height / 2 - explorer.height / 2);
    treasure.position = new Point(stage.width - treasure.width - 48, stage.height / 2 - treasure.height / 2);
    door.position = new Point(32, 0);

    explorer.vx = 0;
    explorer.vy = 0;

    const blobs = [],
        numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150,
        blobSpeed = 2;
    let blobDirection = 1;

    for (let i = 0; i < numberOfBlobs; i++) {
        const blob = new Sprite(spritesheet["blob.png"]);
        blob.position = new Point(spacing * i + xOffset, getRandomInt(0, stage.height - blob.height));
        blob.vy = blobSpeed * blobDirection;
        // revert direction for the next blob to be created.
        blobDirection *= -1;
        blobs.push(blob);
        gameScene.addChild(blob);
    }

    // Add health bar
    const healthBar = new Container();
    healthBar.position = new Point(stage.width - 170, 4);
    gameScene.addChild(healthBar);

    // Create health bar background and foreground
    const innerBar = new Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    const outerBar = new Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);

    healthBar.outer = outerBar;

    // Add game over message
    const message = new PIXIText("Game Over!", {
        fontFamily: "Futura",
        fontSize: "48px"
    });
    message.position = new Point(120, stage.height / 2 - 32);
    gameOverScene.addChild(message);

    setupKeyboard();
    let state = play;
    gameLoop();

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        state();
        renderer.render(stage);
    }
}

function play() {
    "use strict";

    let collision = contain(explorer, {
        x: 0,
        y: 0,
        width: renderer.view.width,
        height: renderer.view.height
    });
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
}

function getRandomInt(min, max) {
    "use strict";
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export { setup, explorer };
