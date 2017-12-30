import { gameScene, gameOverScene } from 'setup';

function end() {
    "use strict";
    gameScene.visible = false;
    gameOverScene.visible = true;
}

export { end };
