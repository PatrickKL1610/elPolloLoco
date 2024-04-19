/**
 * Represents a coin object in the game.
 * Extends the MovableObject class.
 */
class Coin extends MovableObject {
    /**
     * The width of the coin.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 100;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset value.
     * @property {number} bottom - The bottom offset value.
     * @property {number} left - The left offset value.
     * @property {number} right - The right offset value.
     */
    offset = {
        top: 35,
        bottom: 35,
        left: 35,
        right: 35,
    };

    /**
     * Array of paths to images for the coin.
     * @type {string[]}
     */
    COIN_IMAGE = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];

    /**
     * Creates a new Coin object.
     */
    constructor() {
        super().loadImage(this.COIN_IMAGE[0]);
        this.loadImages(this.COIN_IMAGE);
        this.y = 160 + Math.random() * 100;
        this.x = 500 + Math.random() * 3 * Math.random() * 600;
    }
}