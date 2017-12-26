"use strict";

/* global stage, setupKeyboard, renderer, contain, Sprite, Point, Graphics */
/* exported setup */
var dungeon = void 0,
    explorer = void 0,
    treasure = void 0,
    door = void 0;
function setup(loader, resources) {
    "use strict";
    // Add sprites from textures

    var spritesheet = resources["assets/treasureHunter.json"].textures;
    dungeon = new Sprite(spritesheet["dungeon.png"]);
    explorer = new Sprite(spritesheet["explorer.png"]);
    treasure = new Sprite(spritesheet["treasure.png"]);
    door = new Sprite(spritesheet["door.png"]);

    // Add sprites to stage
    var numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150;

    stage.addChild(dungeon);
    stage.addChild(explorer);
    stage.addChild(treasure);
    stage.addChild(door);

    explorer.position = new Point(68, stage.height / 2 - explorer.height / 2);
    treasure.position = new Point(stage.width - treasure.width - 48, stage.height / 2 - treasure.height / 2);
    door.position = new Point(32, 0);

    for (var i = 0; i < numberOfBlobs; i++) {
        var blob = new Sprite(spritesheet["blob.png"]);
        blob.position = new Point(spacing * i + xOffset, getRandomInt(0, stage.height - blob.height));
        stage.addChild(blob);
    }

    setupKeyboard();

    explorer.vx = 0;
    explorer.vy = 0;

    drawGraphics();

    var state = play;
    gameLoop();

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        state();
        renderer.render(stage);
    }
}
function play() {
    "use strict";

    var collision = contain(explorer, {
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

function drawGraphics() {
    "use strict";

    var shape = new Graphics();
    shape.beginFill(0x00FF00);
    shape.lineStyle(3, 0x0000FF, 0.8);
    shape.drawCircle(100, 100, 25);
    shape.endFill();
    stage.addChild(shape);
}