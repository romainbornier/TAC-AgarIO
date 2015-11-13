function Player(id, gameArea, spawnX, spawnY) {
    this.id = id;
    this.cell = new Cell(gameArea, spawnX, spawnY);
}

Player.prototype.getId = function() {
    return this.id;
};

Player.prototype.getCell = function() {
    return this.cell;
};

Player.prototype.toJSON = function() {
    return {
        id: this.id,
        x: this.cell.getCoords().getX(),
        y: this.cell.getCoords().getY()
    };
};