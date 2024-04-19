/**
 * Represents a small chicken object in the game.
 * Extends the MovableObject class.
 */
class miniChicken extends MovableObject {
    /**
     * The y-coordinate position of the chicken.
     * @type {number}
     */
    y = 365;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 50;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 50;

    /**
     * The energy level of the chicken.
     * @type {number}
     */
    energy = 2;

    /**
     * Indicates whether the chicken is dead.
     * @type {boolean}
     */
    isChickenDeath = false;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset value.
     * @property {number} bottom - The bottom offset value.
     * @property {number} left - The left offset value.
     * @property {number} right - The right offset value.
     */
    offset = {
        top: 5,
        bottom: 5,
        left: 20,
        right: 20,
    };

    /**
     * Array of paths to images for the walking animation of the chicken.
     * @type {string[]}
     */
    CHICKEN_SMALL_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    /**
     * Array of paths to images for the dead animation of the chicken.
     * @type {string[]}
     */
    CHICKEN_SMALL_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    /**
     * Creates a new miniChicken object.
     * @param {number} xPosition - The initial x-coordinate position of the chicken.
     */
    constructor(xPosition) {
        super().loadImage(this.CHICKEN_SMALL_WALKING[0]);
        this.loadImages(this.CHICKEN_SMALL_WALKING);
        this.loadImages(this.CHICKEN_SMALL_DEAD);
        this.x = xPosition || 300 + Math.random() * 1000;
        this.speed = 0.7 + Math.random() * 0.5;
        this.animate();
        this.minichickenMovement();
    }

    /**
     * Initiates the movement of the chicken.
     * Moves the chicken to the left at regular intervals.
     */
    minichickenMovement() {
        this.minichickenMovementInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            } else this.playDeathSound();
        }, 1000 / 60);
        allIntervals.push(this.minichickenMovementInterval);
    }

    /**
     * Plays the death sound of the chicken.
     */
    playDeathSound() {
        if (this.isChickenDeath == false) {
            if (world.muted == false) {
                world.kill_chicken_sound.play();
                world.kill_chicken_sound.volume = 0.2;
            }
            this.isChickenDeath = true;
        }
    }

    /**
     * Initiates the animation of the chicken.
     * Plays the walking animation if the chicken is alive,
     * or plays the dead animation if the chicken is dead.
     */
    animate() {
        this.minichickenAnimate = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.CHICKEN_SMALL_DEAD);
            } else {
                this.playAnimation(this.CHICKEN_SMALL_WALKING);
            }
        }, 100);
        allIntervals.push(this.minichickenAnimate);
    }
}
