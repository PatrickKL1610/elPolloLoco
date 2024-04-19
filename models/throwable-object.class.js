/**
 * Represents throwable objects in the game, extending the functionality of MovableObject.
 * @extends MovableObject
 */
class ThrowableObjects extends MovableObject {
    /**
     * Array of image paths representing the rotation animation of the bottle.
     * @type {string[]}
     */
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Array of image paths representing the splash animation of the bottle.
     * @type {string[]}
     */
    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Offset values for collision detection.
     * @type {{ top: number, bottom: number, left: number, right: number }}
     */
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    };

    /**
     * Creates a throwable object instance.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super().loadImage(this.BOTTLE_ROTATION[0]);
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.throw();
    }

    /**
     * Throws the throwable object either left or right based on character direction.
     */
    throw() {
        if (this.hasBottlesAndLooksRight()) {
            this.throwRightAnimation();
            world.collectedBottles.splice(0, 1);
        }
        if (this.hasBottlesAndLooksLeft()) {
            this.throwLeftAnimation();
            world.collectedBottles.splice(0, 1);
        }
    }

    /**
     * Checks if there are bottles and character looks right.
     * @returns {boolean} True if there are bottles and character looks right, otherwise false.
     */
    hasBottlesAndLooksRight() {
        return world.collectedBottles.length > 0 && !world.character.otherDirection;
    }

    /**
     * Checks if there are bottles and character looks left.
     * @returns {boolean} True if there are bottles and character looks left, otherwise false.
     */
    hasBottlesAndLooksLeft() {
        return world.collectedBottles.length > 0 && world.character.otherDirection;
    }

    /**
     * Initiates the animation and movement for throwing the bottle left.
     */
    throwLeftAnimation() {
        this.throwLeftAnimationInterval1 = setInterval(() => {
            this.playAnimation(this.BOTTLE_ROTATION);
        }, 150);
        allIntervals.push(this.throwLeftAnimationInterval1);
        this.speedY = -18;
        this.applyGravaityOtherDirection();
        this.throwLeftAnimationInterval2 = setInterval(() => {
            this.x -= 5;
        }, 1000 / 60);
        allIntervals.push(this.throwLeftAnimationInterval2);
    }

    /**
     * Initiates the animation and movement for throwing the bottle right.
     */
    throwRightAnimation() {
        this.throwRightAnimationInterval1 = setInterval(() => {
            this.playAnimation(this.BOTTLE_ROTATION);
        }, 150);
        allIntervals.push(this.throwRightAnimationInterval1);
        this.speedY = 18;
        this.applyGravaity();
        this.throwRightAnimationInterval2 = setInterval(() => {
            this.x += 5;
        }, 1000 / 60);
        allIntervals.push(this.throwRightAnimationInterval2);
    }

    /**
     * Initiates the splash animation for the bottle.
     */
    splashAnimation() {
        this.splashAnimationIntervall = setInterval(() => {
            this.playAnimation(this.BOTTLE_SPLASH);
        }, 5);
        allIntervals.push(this.splashAnimationIntervall);
    }
}
