// Setup APIs
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const Point = PIXI.Point;
let renderer, stage;
let dungeon, explorer, treasure, door;

function init() {
    "use strict";
    renderer = PIXI.autoDetectRenderer(1024, 768);
    document.body.appendChild(renderer.view);

    stage = new Container();
    renderer.render(stage);

    scaleToWindow(renderer.view);
    window.addEventListener("resize", event => {
        scaleToWindow(renderer.view);
    });
}

function loadCharacters() {
    "use strict";
    PIXI.loader.add("assets/treasureHunter.json")
        .on("progress", logProgress)
        .load(setup);

    function logProgress(loader, resource) {
        console.log("Process: " + Math.round(loader.progress) + "%");
        console.log("File loaded: " + resource.name);
    }

    function setup(loader, resources) {
        const spritesheet = resources["assets/treasureHunter.json"].textures;
        dungeon = new Sprite(spritesheet["dungeon.png"]);
        explorer = new Sprite(spritesheet["explorer.png"]);
        treasure = new Sprite(spritesheet["treasure.png"]);
        door = new Sprite(spritesheet["door.png"]);

        const numberOfBlobs = 6,
            spacing = 48,
            xOffset = 150;

        stage.addChild(dungeon);
        stage.addChild(explorer);
        stage.addChild(treasure);
        stage.addChild(door);

        explorer.position = new Point(68, stage.height / 2 - explorer.height / 2);
        treasure.position = new Point(stage.width - treasure.width - 48, stage.height / 2 - treasure.height / 2);
        door.position = new Point(32, 0);

        for (let i = 0; i < numberOfBlobs; i++) {
            const blob = new Sprite(spritesheet["blob.png"]);
            blob.position = new Point(spacing * i + xOffset, getRandomInt(0, stage.height - blob.height));
            stage.addChild(blob);
        }

        explorer.vx = 1;
        explorer.vy = 1;
        gameLoop();
    }
}
init();
loadCharacters();

function gameLoop() {
    "use strict";
    requestAnimationFrame(gameLoop);
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;
    renderer.render(stage);
}

function getRandomInt(min, max) {
    "use strict";
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
