/**
 * Represents a collectible bottle object in the game.
 * @extends MovableObject
 */
class Bottle extends MovableObject {

    /**
     * The width of the bottle object.
     * @type {number}
     */
    width = 70;
    /**
     * The height of the bottle object.
     * @type {number}
     */
    height = 70;

    /**
     * The offset for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
    };

    /**
     * The image path for the bottle object.
     * @type {string[]}
     */
    BOTTLE_IMAGE = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

    /**
     * Constructs a new bottle object and sets its initial position.
     */
    constructor() {
        super().loadImage(this.BOTTLE_IMAGE[0]);
        this.x = 100 + Math.random() * 4 * 650; // Random position within a range
        this.y = 360; // Vertical position
    }
}
