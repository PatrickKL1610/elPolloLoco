/**
 * Represents the game world containing various game objects and functionality.
 */
class World {
    /**
     * The character controlled by the player.
     * @type {Character}
     */
    character = new Character();

    /**
     * The end boss enemy in the game.
     * @type {Endboss}
     */
    endboss = new Endboss();

    /**
     * The status bar displaying the health of the character.
     * @type {StatusBar}
     */
    healthBar = new StatusBar();

    /**
     * The status bar displaying the number of collected bottles.
     * @type {BottleStatusBar}
     */
    bottleBar = new BottleStatusBar();

    /**
     * The status bar displaying the health of the end boss.
     * @type {EndbossBar}
     */
    endbossBar = new EndbossBar();

    /**
     * The status bar displaying the hearts of the end boss.
     * @type {EndbossBarHearts}
     */
    endbossBarHeart = new EndbossBarHearts();

    /**
     * The status bar displaying the number of collected coins.
     * @type {CoinStatusBar}
     */
    coinBar = new CoinStatusBar();

    /**
     * The background music audio element.
     * @type {HTMLAudioElement}
     */
    background_sound = new Audio('audio/music.mp3');

    /**
     * The audio element for collecting coins.
     * @type {HTMLAudioElement}
     */
    coin_sound = new Audio('audio/coin.mp3');

    /**
     * The audio element for broken bottle sound.
     * @type {HTMLAudioElement}
     */
    broken_bottle_sound = new Audio('audio/broken-bottle.mp3');

    /**
     * The audio element for killing chicken sound.
     * @type {HTMLAudioElement}
     */
    kill_chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Array containing all throwable objects in the world.
     * @type {ThrowableObjects[]}
     */
    throwableObjects = [];

    /**
     * Array containing all collected bottles.
     * @type {ThrowableObjects[]}
     */
    collectedBottles = [];

    /**
     * Array containing all broken bottles.
     * @type {ThrowableObjects[]}
     */
    brockenBottle = [];

    /**
     * Array containing all collected coins.
     * @type {Coin[]}
     */
    collectedCoins = [];

    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The keyboard input handler.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The time passed since last collision.
     * @type {number}
     */
    collisionTimepassed;

    /**
     * The timestamp of the last collision.
     * @type {number}
     */
    lastCollision;

    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Indicates whether the game is muted or not.
     * @type {boolean}
     */
    muted = false;

    /**
     * The current level of the game.
     * @type {Level}
     */
    level = level1;

    /**
     * Creates a new instance of the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectObjects();
        this.loadSounds();
    }

    /**
     * Loads sounds required for the game.
     */
    loadSounds() {
        let soundsToLoad = [
            'audio/music.mp3',
            'audio/coin.mp3',
            'audio/broken-bottle.mp3',
            'audio/chicken.mp3'
        ];

        this.sounds = {};

        soundsToLoad.forEach(soundFile => {
            let sound = new Audio(soundFile);
            sound.oncanplaythrough = () => {
                this.sounds[soundFile] = sound;
            };
        });
    }

    /**
     * Plays a sound from the loaded sounds.
     * @param {string} soundFile - The file name of the sound to play.
     */
    playSound(soundFile) {
        if (this.sounds[soundFile]) {
            this.sounds[soundFile].play();
        } else {
            console.error('Sound ' + soundFile + ' wurde nicht vollständig geladen.');
        }
    }

    /**
     * Checks if the game is muted based on keyboard input.
     */
    isMuted() {
        this.isMutedIntervall = setInterval(() => {
            if (keyboard.MUTE == false) {
                this.muted = false;
            } else if (keyboard.MUTE == true) {
                this.muted = true;
            }
        }, 1000 / 60);
        allIntervals.push(this.isMutedIntervall);
    }

    /**
     * Collects coins, bottles, and checks collisions periodically.
     */
    collectObjects() {
        this.collectObjectsInterval = setInterval(() => {
            this.checkCollectCoin();
            this.checkCollectBottle();
            this.checkCollisionThrowObject();
            this.checkCollisions();
        }, 1000 / 50);
        allIntervals.push(this.collectObjectsInterval);
    }

    /**
     * Checks and collects coins when the character collides with them.
     */
    checkCollectCoin() {
        this.level.coins.forEach((coin, indexCoins) => {
            if (this.character.isColliding(coin)) {
                if (this.muted == false) {
                    this.coin_sound.play();
                    this.coin_sound.volume = 0.2;
                }
                this.collectedCoins.push(coin);
                this.level.coins.splice(indexCoins, 1);
            }
        });
    }

    /**
     * Checks and collects bottles when the character collides with them.
     */
    checkCollectBottle() {
        this.level.bottles.forEach((bottle, indexBottles) => {
            if (this.character.isColliding(bottle)) {
                this.collectedBottles.push(bottle);
                this.level.bottles.splice(indexBottles, 1);
            }
        });
    }

    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop.
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkThrowObjects();
            this.isMuted();
            this.backgroundMusic();
            this.checkGameEnd();
        }, 150);
        allIntervals.push(this.runInterval);
    }

    /**
     * Manages background music playback based on game settings.
     */
    backgroundMusic() {
        if (this.muted == false && this.background_sound.paused) {
            this.background_sound.play();
            this.background_sound.volume = 0.03;
        } else if (this.muted == true && !this.background_sound.paused) {
            this.background_sound.pause();
        }
    }

    /**
     * Checks conditions for throwing bottles and throws them accordingly.
     */
    checkThrowObjects() {
        if (this.pressEnterAndArrayLength()) {
            this.throwBottle();
        }
    }

    /**
     * Throws a bottle from the character's position.
     */
    throwBottle() {
        let bottle = new ThrowableObjects(this.character.x + 10, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }

    /**
     * Checks if the Enter key is pressed and there are collected bottles available.
     * @returns {boolean} - True if the Enter key is pressed and there are collected bottles, otherwise false.
     */
    pressEnterAndArrayLength() {
        return this.keyboard.ENTER && this.collectedBottles.length > 0;
    }

    /**
     * Checks collisions between thrown bottles and enemies.
     */
    checkCollisionThrowObject() {
        this.throwableObjects.forEach((bottle, indexBottle) => {
            this.level.enemies.forEach((enemy, indexEnemy) => {
                if (this.bottleHitsGround(indexBottle)) {
                    this.setCollidingTime();
                    this.throwableObjects[indexBottle].splashAnimation();
                    this.brockenBottleSplice();
                }
                if (this.bottleHitsEnemy(enemy, indexBottle)) {
                    this.setCollidingTime();
                    this.level.enemies[indexEnemy].hit();
                    this.throwableObjects[indexBottle].splashAnimation();
                    this.brockenBottleSplice();
                }
            });
        });
    }

    /**
     * Removes broken bottles from the throwable objects array.
     */
    brockenBottleSplice() {
        this.brokenBottleSound();
        setTimeout(() => {
            this.throwableObjects.shift();
        }, 500);
    }

    /**
     * Checks if a thrown bottle hits an enemy.
     * @param {Enemy} enemy - The enemy to check collision with.
     * @param {number} indexBottle - The index of the thrown bottle.
     * @returns {boolean} - True if the bottle hits the enemy, otherwise false.
     */
    bottleHitsEnemy(enemy, indexBottle) {
        return this.throwableObjects[indexBottle].isColliding(enemy);
    }

    /**
     * Checks if a thrown bottle hits the ground.
     * @param {number} indexBottle - The index of the thrown bottle in the throwableObjects array.
     * @returns {boolean} - True if the thrown bottle hits the ground, otherwise false.
     */
    bottleHitsGround(indexBottle) {
        return this.throwableObjects[indexBottle].y > 330 && this.throwableObjects[indexBottle].y < 370;
    }

    /**
     * Sets the current time as the last collision time.
     */
    setCollidingTime() {
        this.lastCollision = new Date().getTime();
    }


    /**
     * Checks if it's been less than 1000 milliseconds since the last collision.
     * @returns {boolean} - True if less than 1000 milliseconds have passed since the last collision, otherwise false.
     */
    checkFirstCollision() {
        let collisionTimepassed = new Date().getTime() - this.lastCollision;
        return collisionTimepassed < 1000;
    }

    /**
     * Plays or pauses the broken bottle sound based on the time since the last collision and mute status.
     */
    brokenBottleSound() {
        if (this.checkFirstCollision()) {
            if (this.muted == false) {
                this.broken_bottle_sound.play();
            }
            this.broken_bottle_sound.loop = false;
            this.broken_bottle_sound.volume = 0.5;
        } else {
            if (muted == false) {
                this.broken_bottle_sound.pause();
            }
        }
    }

    /**
     * Checks for collisions between the character and enemies, handling the results accordingly.
     */
    checkCollisions() {
        this.checkCollisionsIntervall = setInterval(() => {
            this.level.enemies.forEach((enemy, indexEnemy) => {
                if (this.aboutGroundCollideEnemies(enemy, indexEnemy)) {
                    this.killingHeadJump(indexEnemy);
                    this.level.enemies[indexEnemy].energy = 0;
                } else if (this.collideEnemy(enemy, indexEnemy)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            });
        }, 50);
        allIntervals.push(this.checkCollisionsIntervall);
    }

    /**
     * Checks if the character is colliding with an enemy.
     * @param {Enemy} enemy - The enemy object to check collision with.
     * @param {number} indexEnemy - The index of the enemy in the enemies array.
     * @returns {boolean} - True if the character is colliding with the enemy and the enemy's energy is positive, otherwise false.
     */
    collideEnemy(enemy, indexEnemy) {
        return this.character.isColliding(enemy) && enemy.energy > 0;
    }

    /**
     * Checks if the character is above ground and colliding with an enemy, excluding the end boss, and the enemy has energy greater than 1.
     * @param {Enemy} enemy - The enemy object to check collision with.
     * @param {number} indexEnemy - The index of the enemy in the enemies array.
     * @returns {boolean} - True if the conditions for a head jump are met, otherwise false.
     */
    aboutGroundCollideEnemies(enemy, indexEnemy) {
        return (
            this.character.isAboveGround() &&
            this.character.isColliding(enemy) &&
            this.isNotEndboss(enemy, indexEnemy) &&
            this.level.enemies[indexEnemy].energy > 1 &&
            this.character.y < 200
        );
    }

    /**
     * Checks if the enemy is not the end boss.
     * @param {Enemy} enemy - The enemy object to check.
     * @returns {boolean} - True if the enemy is not the end boss, otherwise false.
     */
    isNotEndboss(enemy) {
        if (enemy == this.level.enemies[6]) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Performs a head jump on the enemy if its energy is greater than 1.
     * @param {number} indexEnemy - The index of the enemy in the enemies array.
     */
    killingHeadJump(indexEnemy) {
        if (this.level.enemies[indexEnemy].energy > 1) {
            this.character.headJump();
        }
    }

    /**
     * Draws all objects on the canvas, including background, characters, enemies, and status bars.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.endbossBarHeart);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of movable objects to the map for drawing.
     * @param {MovableObject[]} objects - The array of movable objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single movable object to the map for drawing.
     * @param {MovableObject} movableObject - The movable object to add to the map.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the image horizontally to simulate the object's movement in the opposite direction.
     * @param {MovableObject} movableObject - The movable object whose image needs to be flipped.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the image's original orientation after flipping.
     * @param {MovableObject} movableObject - The movable object whose image needs to be restored.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Clears the canvas.
     */
    clearRect() {
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Checks for game end conditions and triggers the appropriate screen.
     */
    checkGameEnd() {
        this.checkGameEndInterval = setInterval(() => {
            if (this.level.enemies[6].energy <= 0) {
                gameWinnerScreen(this.muted);
            } else if (world.character.energy <= 0) {
                gameOverScreen(this.muted);
            }
        }, 200);
        allIntervals.push(this.checkGameEndInterval);
    }

    /**
     * Resets the game by clearing arrays related to collected objects.
     */
    resetGame() {
        this.throwableObjects = [];
        this.collectedBottles = [];
        this.collectedCoins = [];
    }
}
