/**
 * Represents a bottle status bar in the game.
 * Extends the DrawableObject class.
 */
class BottleStatusBar extends DrawableObject {

    /**
     * The interval used to update the bottle status bar.
     * @type {number}
     */
    setBottlebarInterval;

    /**
     * Array of paths to images for the bottle status bar.
     * @type {string[]}
     */
    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * Creates a new BottleStatusBar.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLEBAR[0]);
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBottlebar();
    }

    /**
     * Sets up the interval to update the bottle status bar.
     * The interval checks the number of collected bottles and updates the status bar accordingly.
     */
    setBottlebar() {
        this.setBottlebarInterval = setInterval(() => {
            if (world.collectedBottles.length > 1) {
                super.setBar(world.collectedBottles.length, this.IMAGES_BOTTLEBAR);
            } else if (world.collectedBottles.length === 1) {
                super.setBar(1, [this.IMAGES_BOTTLEBAR[1]]);
            } else {
                super.setBar(1, [this.IMAGES_BOTTLEBAR[0]]);
            }
        }, 100);
        allIntervals.push(this.setBottlebarInterval);
    }

    /**
     * Updates the bottle status bar based on the number of collected bottles.
     */
    updateBottleBarStatus() {
        if (world && world.collectedBottles) {
            super.setBar(world.collectedBottles.length, this.IMAGES_BOTTLEBAR);
        }
    }

    /**
     * Clears the interval used to update the bottle status bar.
     */
    clearBottleBarInterval() {
        if (this.setBottlebarInterval) {
            clearInterval(this.setBottlebarInterval);
        }
    }
}
