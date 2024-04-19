/**
 * Represents a character object in the game.
 * Extends the MovableObject class.
 */
class Character extends MovableObject {
    /**
     * The height of the character.
     * @type {number}
     */
    height = 250;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 120;

    /**
     * The y-coordinate position of the character.
     * @type {number}
     */
    y = 170;

    /**
     * The movement speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset value.
     * @property {number} bottom - The bottom offset value.
     * @property {number} left - The left offset value.
     * @property {number} right - The right offset value.
     */
    offset = {
        top: 110,
        bottom: 10,
        left: 25,
        right: 25,
    };

    /**
     * Array of paths to images for the walking animation of the character.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of paths to images for the jumping animation of the character.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Array of paths to images for the dead animation of the character.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Array of paths to images for the hurt animation of the character.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Array of paths to images for the idle animation of the character.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Array of paths to images for the waiting animation of the character.
     * @type {string[]}
     */
    IMAGES_WAITING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /**
     * Reference to the world object.
     * @type {World}
     */
    world;

    /**
     * Audio element for the walking sound of the character.
     * @type {HTMLAudioElement}
     */
    walking_sound = new Audio('audio/newwalk.mp3');

    /**
     * Audio element for the jumping sound of the character.
     * @type {HTMLAudioElement}
     */
    jumping_sound = new Audio('audio/jump.mp3');

    /**
     * Audio element for the sleeping sound of the character.
     * @type {HTMLAudioElement}
     */
    sleep_sound = new Audio('audio/snoring.mp3');

    /**
     * Creates a new Character object.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WAITING);
        this.initializeAnimation();
        this.applyGravaity();
        this.monitorCharacterState();
        this.animate();
    }

    /**
    * Initiates the animation loop for the character's movement.
    */
    animate() {
        this.movementInterval = setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.endboss.x) {
                this.characterRightMovement();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.characterLeftMovement();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.characterJumpMovement();
            }
            this.followCharacterWithCamera();
        }, 1000 / 60);
        allIntervals.push(this.movementInterval);
    }

    /**
     * Initializes the animation intervals for the character's actions.
     */
    initializeAnimation() {
        this.animatonCharacterInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isMoving()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.handleIdleAnimations();
            }
        }, 100);
        allIntervals.push(this.animatonCharacterInterval);
    }

    /**
     * Follows the character with the camera.
     */
    followCharacterWithCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles the idle animations of the character.
     */
    handleIdleAnimations() {
        this.timeSinceLastAction = new Date().getTime() - this.lastAction;
        if (this.timeSinceLastAction > 2000) {
            this.playAnimation(this.IMAGES_IDLE);
            this.playSleepSound(); // Funktion zum Abspielen des Schlafsounds aufrufen
        } else {
            this.playAnimation(this.IMAGES_WAITING);
        }
    }

    /**
     * Plays the sleeping sound of the character.
     */
    playSleepSound() {
        if (!this.world.muted) {
            this.playSound(this.sleep_sound);
        }
    }

    /**
     * Monitors the state of the character to track inactivity.
     * Updates the last action timestamp if the character is inactive.
     */
    monitorCharacterState() {
        this.stateMonitorInterval = setInterval(() => {
            if (this.isInactive()) {
                this.lastAction = new Date().getTime();
            }
        }, 100);
        allIntervals.push(this.stateMonitorInterval);
    }

    /**
     * Checks if the character is currently moving.
     * @returns {boolean} True if the character is moving, false otherwise.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || (this.world.keyboard.LEFT && !this.isAboveGround());
    }

    /**
     * Initiates a jump for the character by setting the vertical speed.
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Initiates movement to the right for the character.
     * Moves the character to the right, sets direction, and plays walking sound.
     */
    characterRightMovement() {
        this.moveRight();
        this.otherDirection = false;
        this.playWalkingSound();
        this.playWalkingSound();
    }

    /**
     * Initiates movement to the left for the character.
     * Moves the character to the left, sets direction, and plays walking sound.
     */
    characterLeftMovement() {
        this.moveLeft();
        this.otherDirection = true;
        this.playWalkingSound();
    }

    /**
     * Initiates a jump movement for the character.
     * Pauses walking sound, plays jumping sound, and calls jump method.
     */
    characterJumpMovement() {
        this.pauseSound(this.walking_sound);
        if (!this.world.muted) {
            this.playSound(this.jumping_sound);
            this.jumping_sound.volume = 0.5;
        }
        this.jump();
    }

    /**
     * Plays the walking sound if not muted, otherwise pauses it.
     */
    playWalkingSound() {
        if (!this.world.muted) {
            this.playSound(this.walking_sound);
        } else {
            this.pauseSound(this.walking_sound);
        }
    }

    /**
     * Plays the provided audio element.
     * @param {HTMLAudioElement} audioElement - The audio element to play.
     */
    playSound(audioElement) {
        if (audioElement) {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                }).catch(error => {
                });
            }
        }
    }

    /**
     * Pauses the provided audio element.
     * @param {HTMLAudioElement} audioElement - The audio element to pause.
     */
    pauseSound(audioElement) {
        if (audioElement) {
            try {
                audioElement.pause();
            } catch (error) {
            }
        }
    }

    /**
     * Checks if the right arrow key is pressed and character is within the game boundaries.
     * @returns {boolean} True if the right arrow key is pressed and character is within boundaries, otherwise false.
     */
    keyboardRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.endboss.x;
    }

    /**
     * Checks if the left arrow key is pressed and character is within the game boundaries.
     * @returns {boolean} True if the left arrow key is pressed and character is within boundaries, otherwise false.
     */
    keyboardLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the space key is pressed and character is not above the ground.
     * @returns {boolean} True if the space key is pressed and character is not above the ground, otherwise false.
     */
    keyboardJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
    * Checks if the character is inactive.
    * @returns {boolean} True if the character is inactive, false otherwise.
    */
    isInactive() {
        return (
            this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.SPACE ||
            this.world.keyboard.ENTER ||
            this.isAboveGround() ||
            this.isHurt() ||
            this.isDead()
        );
    }
}