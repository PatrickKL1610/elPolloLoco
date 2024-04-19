/**
 * Represents the health bar for the end boss in the game.
 * Extends the DrawableObject class.
 */
class EndbossBarHearts extends DrawableObject {
    /**
     * Array of paths to images representing the boss heart icon.
     * @type {string[]}
     */
    IMAGES_BOSSHEART = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

    /**
     * Creates a new EndbossBarHearts object.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOSSHEART[0]);
        this.x = 430;
        this.y = 5;
        this.width = 0;
        this.height = 80;
    }
}
