function Config() {
    this.gameWidth = 1000;
    this.gameHeight = 1000;
    this.fps = 60;

    this.gridSize = 50;

    this.pelletQty = 100;
    this.pelletSize = 10;

    this.cellStartScore = 10;

    this.room = "agario_room72";
}

Config.prototype.getGameWidth = function() {
    return this.gameWidth;
};

Config.prototype.getGameHeight = function() {
    return this.gameHeight;
};

Config.prototype.getFps = function() {
    return this.fps;
};

Config.prototype.getGridSize = function() {
    return this.gridSize;
};

Config.prototype.getPelletQty = function() {
    return this.pelletQty;
};

Config.prototype.getCellStartScore = function() {
    return this.cellStartScore;
};

Config.prototype.getPelletSize = function() {
    return this.pelletSize;
};

Config.prototype.getRoom = function() {
    return this.room;
};