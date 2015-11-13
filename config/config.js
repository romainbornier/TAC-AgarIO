function Config() {
    this.gameWidth = 1000;
    this.gameHeight = 1000;
    this.fps = 30;

    this.gridSize = 50;

    this.pelletQty = 100;
    this.pelletSize = 10;
    this.pelletValue = 1;

    this.cellStartScore = 10;

    this.font = "20px Georgia";
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

Config.prototype.getPelletValue = function() {
    return this.pelletValue;
};

Config.prototype.getCellStartScore = function() {
    return this.cellStartScore;
};

Config.prototype.getPelletSize = function() {
    return this.pelletSize;
};

Config.prototype.getFont = function() {
    return this.font;
};