/**
 * Represents a status bar for displaying the collected coins in the game.
 * Extends the DrawableObject class.
 */
class CoinStatusBar extends DrawableObject {
    /**
     * Array of paths to images for the coin status bar.
     * @type {string[]}
     */    IMAGES_COIN_BAR = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
    ];

    /**
     * Creates a new CoinStatusBar object.
     */
    constructor() {
        super().loadImage(this.IMAGES_COIN_BAR[0]);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoinbar();
    }

    /**
     * Sets up the interval to update the coin status bar.
     */
    setCoinbar() {
        this.setCoinbarInterval = setInterval(() => {
            super.setBar(world.collectedCoins.length, this.IMAGES_COIN_BAR);
        }, 100);
        allIntervals.push(this.setCoinbarInterval);
    }
}