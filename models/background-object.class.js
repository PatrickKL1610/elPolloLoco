/**
 * Represents a background object in the game.
 * Extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}