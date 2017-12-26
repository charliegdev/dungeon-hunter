"use strict";

/* global setup, Container */
var renderer = void 0,
    stage = void 0;
function init() {
    "use strict";

    renderer = PIXI.autoDetectRenderer(1024, 768);
    document.body.appendChild(renderer.view);

    stage = new Container();
    renderer.render(stage);

    scaleToWindow(renderer.view);
    window.addEventListener("resize", function (event) {
        scaleToWindow(renderer.view);
    });
}

function loadCharacters() {
    "use strict";

    PIXI.loader.add("assets/treasureHunter.json").on("progress", logProgress).load(setup);

    function logProgress(loader, resource) {
        console.log("Process: " + Math.round(loader.progress) + "%");
        console.log("File loaded: " + resource.name);
    }
}
init();
loadCharacters();