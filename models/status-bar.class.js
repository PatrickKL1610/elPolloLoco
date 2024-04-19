/**
 * Represents a status bar in the game, extending the functionality of DrawableObject.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths representing the health status bar.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',//0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',//5
    ];

    /**
     * Audio element for the game over sound.
     * @type {HTMLAudioElement}
     */
    gameOver = new Audio("audio/game-over.mp3");

    /**
     * The percentage value of the status bar.
     * @type {number}
     * @default 500
     */
    percantage = 500;

    /**
     * Creates a status bar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(1000);
    }

    /**
     * Sets the percentage value of the status bar.
     * @param {number} percantage - The percentage value to set.
     */
    setPercentage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the percentage value.
     * @returns {number} The index of the image.
     */
    resolveImageIndex() {
        if (this.percantage == 1000) {
            return 5;
        } else if (this.percantage > 800) {
            return 4;
        } else if (this.percantage > 600) {
            return 3;
        } else if (this.percantage > 400) {
            return 2;
        } else if (this.percantage > 200) {
            return 1;
        } else {
            return 0;
        }
    }
}
