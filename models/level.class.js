/**
 * Represents a game level containing various elements such as enemies, clouds, background objects, coins, and bottles.
 */
class Level {
    /**
     * The enemies in the level.
     * @type {Array}
     */
    enemies;

    /**
     * The clouds in the level.
     * @type {Array}
     */
    clouds;

    /**
     * The background objects in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * The coins in the level.
     * @type {Array}
     */
    coins;

    /**
     * The bottles in the level.
     * @type {Array}
     */
    bottles;

    /**
     * The x-coordinate at which the level ends.
     * @type {number}
     */
    level_end_x = 2200;

    /**
     * Creates a new level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} bottles - The bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
