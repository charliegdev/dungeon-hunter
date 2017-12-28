"use strict";

/* global setup, Container */
var renderer = void 0,
    stage = void 0;
function init() {
    "use strict";

    renderer = PIXI.autoDetectRenderer(512, 512);
    document.body.appendChild(renderer.view);

    stage = new Container();
    renderer.render(stage);
}

function loadAssets() {
    "use strict";

    PIXI.loader.add("assets/spritesheets/treasureHunter.json").add("assets/fonts/vcr-osd-mono.fnt").on("progress", logProgress).load(setup);

    function logProgress(loader, resource) {
        console.log("Process: " + Math.round(loader.progress) + "%");
        console.log("File loaded: " + resource.name);
    }
}
init();
loadAssets();