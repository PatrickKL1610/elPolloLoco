/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    /**
     * The x-coordinate position of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate position of the drawable object.
     * @type {number}
     */
    y = 230;

    /**
     * The height of the drawable object.
     * @type {number}
     */
    height = 200;

    /**
     * The width of the drawable object.
     * @type {number}
     */
    width = 100;

    /**
     * The image object representing the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for storing loaded images.
     * @type {Object}
     */
    imageCache = {};

    /**
     * Index of the current image being displayed.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an array of images and stores them in the image cache.
     * @param {string[]} arr - The array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    /**
     * Sets the drawable object's image based on the provided array and image bar.
     * @param {number} array - The array representing the status of the object.
     * @param {string[]} imageBar - The array of image paths representing the status bar.
     */
    setBar(array, imageBar) {
        const index = Math.min(Math.floor(array / 2), imageBar.length - 1);
        this.loadImage(imageBar[index]);
    }
}