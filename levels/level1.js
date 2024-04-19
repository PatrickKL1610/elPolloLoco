let level1;
function initLevel() {
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createBackgrounds(),
        createCoins(),
        createBottles(),
    );
}

function createEnemies() {
    let enemies = [
        new Chicken(), new Chicken(), new Chicken(),
        new miniChicken(), new miniChicken(), new miniChicken(),
        new Endboss()
    ];

    let endbossPositionX = 2000;
    let additionalEnemies = [
        new Chicken(endbossPositionX - 10),
        new Chicken(endbossPositionX - 30),
        new Chicken(endbossPositionX - 200),
        new miniChicken(endbossPositionX - 180),
        new miniChicken(endbossPositionX - 50),
        new miniChicken(endbossPositionX - 0),

    ];

    return enemies.concat(additionalEnemies);
}

function createBackgrounds() {
    return [
        new BackgroundObject("img/5_background/layers/air.png", -719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/air.png", 719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/air.png", 1438),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1438),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),

        new BackgroundObject("img/5_background/layers/air.png", 2157),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2157),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2157),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157),
    ];
}

function createClouds() {
    return [new Cloud(), new Cloud()];
}

function createCoins() {
    return [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
}

function createBottles() {
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ];
}
