/**
 * Represents the health bar for the end boss in the game.
 * Extends the DrawableObject class.
 */
class EndbossBar extends DrawableObject {
    /**
     * Array of paths to images representing the boss health bar.
     * @type {string[]}
     */
    IMAGES_BOSSHEALTH = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ];

    /**
     * Creates a new EndbossBar object.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_BOSSHEALTH[0]);
        this.loadImages(this.IMAGES_BOSSHEALTH);
        this.x = 450;
        this.y = 0;
        this.width = 0;
        this.height = 70;
        this.setBottlebar();
    }

    /**
     * Sets the health bar of the end boss based on its energy level.
     */
    setBottlebar() {
        this.setBottlebarInterval = setInterval(() => {
            if (world.level.enemies[6].energy >= 150) {
                this.loadImage(this.IMAGES_BOSSHEALTH[5]);
            } else if (world.level.enemies[6].energy >= 120) {
                this.loadImage(this.IMAGES_BOSSHEALTH[4]);
            } else if (world.level.enemies[6].energy >= 90) {
                this.loadImage(this.IMAGES_BOSSHEALTH[3]);
            } else if (world.level.enemies[6].energy >= 50) {
                this.loadImage(this.IMAGES_BOSSHEALTH[2]);
            } else if (world.level.enemies[6].energy >= 30) {
                this.loadImage(this.IMAGES_BOSSHEALTH[1]);
            } else {
                this.loadImage(this.IMAGES_BOSSHEALTH[0]);
            }
        }, 100);
        allIntervals.push(this.setBottlebarInterval);
    }
}
