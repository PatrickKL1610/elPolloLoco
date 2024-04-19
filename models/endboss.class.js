/**
 * Represents the end boss in the game.
 * Extends the MovableObject class.
 */
class Endboss extends MovableObject {
    /**
     * Height of the end boss.
     * @type {number}
     */
    height = 400;

    /**
     * Width of the end boss.
     * @type {number}
     */
    width = 400;

    /**
     * Vertical position of the end boss.
     * @type {number}
     */
    y = 60;

    /**
     * Energy level of the end boss.
     * @type {number}
     */
    energy = 150;

    /**
     * Object representing the offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset value.
     * @property {number} bottom - The bottom offset value.
     * @property {number} left - The left offset value.
     * @property {number} right - The right offset value.
     */
    offset = {
        top: 70,
        bottom: 10,
        left: 60,
        right: 30,
    };

    /**
     * Array of paths to images representing the end boss's alert animation.
     * @type {string[]}
     */
    IMAGES_ALERTA = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    /**
     * Array of paths to images representing the end boss's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    /**
     * Array of paths to images representing the end boss's attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    /**
     * Array of paths to images representing the end boss's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    /**
     * Array of paths to images representing the end boss's dead animation.
     * @type {string[]}
     */
    ENDBOSS_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    /**
     * Speed of the end boss.
     * @type {number}
     */
    speed = 1.5;

    /**
     * Indicates if the alert animation has been played.
     * @type {boolean}
     */
    alertaPlayed = false;

    /**
     * Indicates if the end boss is currently attacking.
     * @type {boolean}
     */
    isAttacking = false;

    /**
     * Interval for animating the end boss.
     * @type {number|null}
     */
    endbossAnimateInterval = null;

    /**
     * Audio element for the hit sound.
     * @type {HTMLAudioElement}
     */
    hit_sound = new Audio('audio/hitmarker.mp3');

    /**
     * Timeout for preventing rapid hit sounds.
     * @type {number|null}
     */
    hitSoundTimeout = null;

    /**
     * Image element for the hit marker.
     * @type {HTMLImageElement}
     */
    hitmarkerImage = new Image();

    /**
     * Indicates whether to show the hit marker.
     * @type {boolean}
     */
    showHitmarker = false;

    /**
     * Timeout for controlling the hit marker display.
     * @type {number|null}
     */
    hitmarkerTimeout = null;

    /**
     * Width of the hit marker.
     * @type {number}
     */
    hitmarkerWidth = 50;

    /**
     * Height of the hit marker.
     * @type {number}
     */
    hitmarkerHeight = 50;

    /**
     * Creates a new Endboss object.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERTA[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERTA);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        this.hitmarkerImage.src = 'img/11_hitmarker/hitmarker.png';
        this.x = 2300;
        this.animate();
    }

    /**
     * Starts the animation loop for the end boss.
     */
    animate() {
        this.endbossAnimateInterval = setInterval(() => {
            if (this.energy <= 0) {
                this.speed = 0;
                this.playAnimation(this.ENDBOSS_DEAD);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (!this.alertaPlayed) {
                this.playAnimation(this.IMAGES_ALERTA);
                if (this.currentImage % this.IMAGES_ALERTA.length === 0) {
                    this.alertaPlayed = true;
                    this.movement();
                }
            } else if (this.checkDistancePepeEndboss() || this.checkIfEndbossMoved()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.endbossBarSize();
            }
        }, 300);
        allIntervals.push(this.endbossAnimateInterval);
    }

    /**
     * Handles a hit received by the end boss.
     */
    hit() {
        super.hit();
        this.handleHitEffects();
    }

    /**
     * Handles effects of being hit by a player.
     */
    handleHitEffects() {
        if (this.energy > 0 && !this.isDead()) {
            this.isAttacking = true;
            this.playHitSound();
            this.showRandomHitmarker();
            setTimeout(() => {
                this.isAttacking = false;
            }, this.IMAGES_ATTACK.length * 300);
        }
    }

    /**
     * Plays the hit sound with a cooldown.
     */
    playHitSound() {
        if (!this.hitSoundTimeout) {
            this.hit_sound.play();
            this.hitSoundTimeout = setTimeout(() => {
                this.hitSoundTimeout = null;
            }, 1000);
        }
    }

    /**
     * Shows a random hit marker.
     */
    showRandomHitmarker() {
        if (!this.showHitmarker) {
            this.showHitmarker = true;
            const paddingWidth = this.width * 0.3;
            const paddingHeight = this.height * 0.3;
            this.hitmarkerX = this.x + this.offset.left + paddingWidth / 2 + Math.random() * (this.width - this.offset.left - this.offset.right - paddingWidth);
            this.hitmarkerY = this.y + this.offset.top + paddingHeight / 2 + Math.random() * (this.height - this.offset.top - this.offset.bottom - paddingHeight);
            clearTimeout(this.hitmarkerTimeout);
            this.hitmarkerTimeout = setTimeout(() => {
                this.showHitmarker = false;
            }, 500);
        }
    }

    /**
     * Draws the end boss and, if applicable, the hit marker.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        super.draw(ctx);
        if (this.showHitmarker) {
            ctx.drawImage(this.hitmarkerImage, this.hitmarkerX, this.hitmarkerY, this.hitmarkerWidth, this.hitmarkerHeight);
        }
    }

    /**
     * Stops the end boss animation interval.
     */
    destroy() {
        if (this.endbossAnimateInterval) {
            clearInterval(this.endbossAnimateInterval);
            const index = allIntervals.indexOf(this.endbossAnimateInterval);
            if (index > -1) {
                allIntervals.splice(index, 1);
            }
        }
    }

    /**
     * Adjusts the size of the end boss health bar.
     */
    endbossBarSize() {
        world.endbossBar.width = 250;
        world.endbossBarHeart.width = 80;
    }

    /**
     * Checks if the distance between the player and the end boss is too close.
     * @returns {boolean} - Whether the distance is too close.
     */
    distanceTooClose() {
        return world.endboss.x - world.character.x <= 150;
    }

    /**
     * Initiates the movement of the end boss.
     */
    movement() {
        this.endbossMovementInterval = setInterval(() => {
            if (this.checkDistancePepeEndboss() || (this.checkIfEndbossMoved() && this.energy > 0)) {
                this.moveLeft();
            }
        }, 1000 / 60);
        allIntervals.push(this.endbossMovementInterval);
    }

    /**
     * Checks if the distance between the player and the end boss is sufficient for starting the movement.
     * @returns {boolean} - Whether the distance is sufficient.
     */
    checkDistancePepeEndboss() {
        return world.character.x > 1950;
    }

    /**
     * Checks if the end boss has moved enough for initiating the movement.
     * @returns {boolean} - Whether the end boss has moved enough.
     */
    checkIfEndbossMoved() {
        return world.endboss.x < 2300 || this.energy < 149;
    }
}
