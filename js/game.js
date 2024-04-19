let canvas;
let world;
let keyboard = new Keyboard();
let game_over_sound = new Audio('audio/game-over.mp3');
let game_winner_sound = new Audio('audio/you-win.mp3');
let gameFinish = false;
let allIntervals = [];

/**
 * Starts the game when the start button is pressed
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('muteButton').classList.remove('d-none');
    document.getElementById('buttonsLeft').classList.remove('d-none');
    document.getElementById('buttonsRight').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    initLevel();
    init();
}

/**
 * Opens the game instructions window
 */
function openHowToPlay() {
    document.getElementById('mainHTP').classList.remove('d-none');
}

/**
 * Close the game instructions window
 */
function closeHowToPlay() {
    document.getElementById('mainHTP').classList.add('d-none');
}

/**
 * Initializes the canvas and the world
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Checks whether the game was won and displays the winner window
 * @param {boolean} muted - Whether the game is muted or not
 */
function gameWinnerScreen(muted) {
    if (gameFinish == false) {
        world.character.walking_sound.pause();
        world.background_sound.pause();
        keyboard.MUTE = true;
        allIntervals.forEach(clearInterval);
        if (!muted) {
            game_winner_sound.play();
            game_winner_sound.volume = 0.4;
        }
        document.getElementById('muteButton').classList.add('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('unMuteButton').classList.add('d-none');
        document.getElementById('buttonsLeft').classList.add('d-none');
        document.getElementById('buttonsRight').classList.add('d-none');
        document.getElementById('gameWinnerScreen').classList.remove('d-none');
        gameFinish = true;
    }
}

/**
 * Checks whether the game has been lost and displays the lost window
 * @param {boolean} muted - Whether the game is muted or not
 */
function gameOverScreen(muted) {
    if (gameFinish == false) {
        stopIngameSounds();
        allIntervals.forEach(clearInterval);
        if (!muted) {
            game_over_sound.play();
            game_over_sound.volume = 0.4;
        }
        document.getElementById('muteButton').classList.add('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('buttonsLeft').classList.add('d-none');
        document.getElementById('buttonsRight').classList.add('d-none');
        document.getElementById('unMuteButton').classList.add('d-none');
        document.getElementById('gameOverScreen').classList.remove('d-none');
        gameFinish = true;
    }
}

/**
 * Game volume is muted
 */
function stopIngameSounds() {
    keyboard.MUTE = true;
    world.character.walking_sound.pause();
    world.background_sound.pause();
}

/**
 * Jump back to the start window
 */
function backToStartScreen() {
    world.resetGame();
    keyboard.MUTE = false;
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('muteButton').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('buttonsLeft').classList.add('d-none');
    document.getElementById('buttonsRight').classList.add('d-none');
    document.getElementById('gameWinnerScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    gameFinish = false;
}

/**
 * Change from unmute to mute
 */
function muteGame() {
    document.getElementById('unMuteButton').classList.remove('d-none');
    document.getElementById('muteButton').classList.add('d-none');
    keyboard.MUTE = true;
}
/**
 * Change from mute to unmute
 */
function unMuteGame() {
    document.getElementById('muteButton').classList.remove('d-none');
    document.getElementById('unMuteButton').classList.add('d-none');
    keyboard.MUTE = false;
}

/**
 * Simulates a key press event
 * @param {number} keyCode - The keycode of the key being pressed
 * @param {string} type - The type of the event ('keydown' or 'keyup')
 */
function simulateKeyPressed(keyCode, type) {
    let e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, false);
    e.keyCode = keyCode;
    document.dispatchEvent(e);

    const isPressed = type === 'keydown';

    updateKeyState(e.keyCode, isPressed);
}

/**
 * Updates the state of the keys in the keyboard object based on the key code and whether it is pressed.
 * @param {number} keyCode - The key code of the key to update.
 * @param {boolean} isPressed - Whether the key is pressed or not.
 */
function updateKeyState(keyCode, isPressed) {
    switch (keyCode) {
        case 39: // Right Arrowkey
        case 68: // D
            keyboard.RIGHT = isPressed;
            break;
        case 37: // Left Arrowkey
        case 65: // A
            keyboard.LEFT = isPressed;
            break;
        case 32: // Space
            keyboard.SPACE = isPressed;
            break;
        case 13: // Enter
            keyboard.ENTER = isPressed;
            break;
    }
}

// Event listeners for keydown and keyup events
window.addEventListener('keydown', (e) => {
    updateKeyState(e.keyCode, true);
});

window.addEventListener('keyup', (e) => {
    updateKeyState(e.keyCode, false);
});
