const DH = window.dungeonHunter;
DH.init();
DH.loadCharacters();

function gameLoop() {
    requestAnimationFrame(gameLoop);
    DH.characters.explorer.x += 1;
    DH.renderer.render(DH.stage);
}

gameLoop();


