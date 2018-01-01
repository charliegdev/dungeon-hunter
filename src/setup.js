import { Container, Sprite, Point, Graphics, PIXIText, spriteUtils } from 'globals';
import { stage, renderer } from 'app';
import { setupKeyboard } from 'keyboard-setup';
import { play, isGameOver } from 'play';
import { end } from 'end';
let dungeon, adventuress, treasure, door, gameScene, gameOverScene, healthBar, message;
const blobs = [];

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
    treasure = new Sprite(spritesheet["treasure.png"]);
    door = new Sprite(spritesheet["door.png"]);

    const adventuressTexture = resources["../assets/spritesheets/adventuress.png"];

    gameScene.addChild(dungeon);
    gameScene.addChild(treasure);
    // Add adventuress
    setupAnimatedSprites(adventuressTexture);
    gameScene.addChild(door);

    adventuress.position = new Point(68, stage.height / 2 - adventuress.height / 2);
    treasure.position = new Point(stage.width - treasure.width - 48, stage.height / 2 - treasure.height / 2);
    door.position = new Point(32, 0);

    adventuress.vx = 0;
    adventuress.vy = 0;

    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150,
        blobSpeed = 2,
        blobDirection = 1;

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
    healthBar = new Container();
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
    message = new PIXIText("Game Over!", {
        fontFamily: "Futura",
        fontSize: "48px",
        fill: "red"
    });
    message.position = new Point(120, stage.height / 2 - 32);
    gameOverScene.addChild(message);

    setupKeyboard();


    let state = play;
    gameLoop();

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        if (isGameOver) {
            state = end;
        }
        state();
        renderer.render(stage);
    }
}

function getRandomInt(min, max) {
    "use strict";
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function setupAnimatedSprites(texture) {
    "use strict";
    const frames = spriteUtils.filmstrip("../assets/spritesheets/adventuress.png", 32, 32);
    adventuress = spriteUtils.sprite(frames);

    adventuress.states = {
        down: 0,
        left: 3,
        right: 6,
        up: 9,

        walkDown: [0, 2],
        walkLeft: [3, 5],
        walkRight: [6, 8],
        walkUp: [9, 11]
    };

    adventuress.show(adventuress.states.right);
    gameScene.addChild(adventuress);
}

export { setup, adventuress, blobs, healthBar, treasure, door, message, gameScene, gameOverScene };
