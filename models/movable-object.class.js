/**
 * Represents a movable object in the game, extending the functionality of DrawableObject.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * The horizontal movement speed of the object.
     * @type {number}
     * @default 0.2
     */
    speed = 0.2;

    /**
     * Indicates whether the object is moving in the opposite direction.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * The vertical movement speed of the object.
     * @type {number}
     * @default 0
     */
    speedY = 0;

    /**
     * The acceleration value for vertical movement.
     * @type {number}
     * @default 2
     */
    acceleration = 2;

    /**
     * The timestamp of the last hit on the object.
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * The audio for the jump sound.
     * @type {HTMLAudioElement}
     */
    reJump_sound = new Audio('audio/jump.mp3');

    /**
     * The audio for the hurt sound.
     * @type {HTMLAudioElement}
     */
    hurt_sound = new Audio('audio/hurt.mp3');

    /**
     * The audio for the death sound.
     * @type {HTMLAudioElement}
     */
    death_sound = new Audio('audio/death.mp3');

    /**
     * The energy level of the object.
     * @type {number}
     * @default 1000
     */
    energy = 1000;

    /**
     * The offset values for collision detection.
     * @type {{ top: number, bottom: number, left: number, right: number }}
     * @default { top: 0, bottom: 0, left: 0, right: 0 }
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Handles a hit on the object, reducing its energy level.
     */
    hit() {
        const timeSinceLastHit = new Date().getTime() - this.lastHit;
        const timeThreshold = 1;

        if (timeSinceLastHit >= timeThreshold) {
            this.energy -= 1;
            if (this.energy < 0) {
                this.energy = 0;
                this.playDeathSound();
            } else {
                this.lastHit = new Date().getTime();
                this.playHurtSound();
            }
        }
    }

    /**
     * Plays the hurt sound if conditions are met.
     */
    playHurtSound() {
        if (!world.muted && this.isHurtByCharacterCollision() && this.hurt_sound.paused) {
            this.hurt_sound.volume = 0.1;
            this.hurt_sound.play();
        }
    }

    /**
     * Checks if the object is hurt by character collision.
     * @returns {boolean} Whether the object is hurt by character collision.
     */
    isHurtByCharacterCollision() {
        return this instanceof Character && this.isHurt();
    }

    /**
     * Plays the death sound.
     */
    playDeathSound() {
        if (!world.muted) {
            this.death_sound.play();
        }
    }

    /**
     * Moves the object back upon collision.
     */
    hitsBack() {
        this.x -= 1;
        if (this.world.character.y >= 160) {
            this.speedY = 20;
        }
    }

    /**
     * Initiates a head jump action.
     */
    headJump() {
        if (world.muted == false) {
            this.reJump_sound.play();
            this.reJump_sound.volume = 0.2;
        }
        this.speedY = 10;
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} Whether the object is hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} Whether the object is dead.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Applies gravity to the object, moving it downward.
     */
    applyGravaity() {
        this.applyGravaityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        allIntervals.push(this.applyGravaityInterval);
    }

    /**
     * Applies gravity in the opposite direction.
     */
    applyGravaityOtherDirection() {
        this.applyGravaityOtherDirectionInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY += this.acceleration;
            }
        }, 1000 / 25);
        allIntervals.push(this.applyGravaityOtherDirectionInterval);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} Whether the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true;
        } else {
            return this.y < 170;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} Whether the object is colliding with the other object.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        ); // B => T
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays the animation for the object.
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Initiates a jump action for the object.
     */
    jump() {
        this.speedY = 35;
    }
}
