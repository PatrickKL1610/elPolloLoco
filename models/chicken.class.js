/**
 * Represents a chicken object in the game.
 * Extends the MovableObject class.
 */
class Chicken extends MovableObject {
    /**
     * The y-coordinate position of the chicken.
     * @type {number}
     */
    y = 340;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 80;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 80;

    /**
     * Indicates whether the chicken is dead.
     * @type {boolean}
     */
    isChickenDeath = false;

    /**
     * The energy level of the chicken.
     * @type {number}
     */
    energy = 2;

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
        left: 25,
        right: 25,
    };

    /**
     * Array of paths to images for the walking animation of the chicken.
     * @type {string[]}
     */
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Array of paths to images for the dead animation of the chicken.
     * @type {string[]}
     */
    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a new Chicken object.
     * @param {number} xPosition - The initial x-coordinate position of the chicken.
     */
    constructor(xPosition) {
        super().loadImage(this.CHICKEN_WALKING[0]);
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = xPosition || 600 + Math.random() * 800;
        this.speed = 0.7 + Math.random() * 0.5;
        this.initializeAnimation();
        this.chickenMovement();
    }

    /**
     * Initiates the movement of the chicken.
     * Moves the chicken to the left until it is dead, then plays death sound.
     */
    chickenMovement() {
        this.chickenMovementInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            } else this.playDeathSound();
        }, 1000 / 60);
        allIntervals.push(this.chickenMovementInterval);
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
     * Initializes the animation intervals for the chicken's movements.
     */
    initializeAnimation() {
        this.chickenAnimateInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.CHICKEN_DEAD);
            } else {
                this.playAnimation(this.CHICKEN_WALKING);
            }
        }, 100);
        allIntervals.push(this.chickenAnimateInterval);
    }
}
