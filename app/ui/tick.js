
const speed = 4;
const interval = 100;

export function setupTimer(ui) {
    let tickTimer;
    let lastTick;
    
    const playState = document.createElement('div');
    playState.className = 'play-state';
    playState.textContent = 'Press Space to play/pause';
    document.body.appendChild(playState);

    document.body.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            if (tickTimer) {
                clearInterval(tickTimer);
                tickTimer = null;
                playState.textContent = 'Paused';
            } else {
                lastTick = performance.now();
                tickTimer = setInterval(() => {
                    const now = performance.now();
                    const elapsed = (now - lastTick) / 1000 * speed;
                    lastTick = now;
                    ui.world.tick(elapsed);
                    ui.update();
                }, interval);
                playState.textContent = 'Play';
            }
        }
    });
}
