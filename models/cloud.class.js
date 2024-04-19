/**
 * Represents a cloud object in the game.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {
    /**
      * The y-coordinate position of the cloud.
      * @type {number}
      */
    y = 10;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 1440;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new Cloud object.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 10 + Math.random() * 2000; // Zahl zwischen 0 und 500
        this.initializeAnimation();

    }

    /**
     * Initializes the animation interval for the cloud's movement.
     */
    initializeAnimation() {
        this.cloudAnimateInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        allIntervals.push(this.cloudAnimateInterval);
    }
}