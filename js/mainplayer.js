function Mainplayer(id, gameArea) {
    this.id = id;
    this.target = new D2Coordinate();
    this.frame = new Canvas("frame");
    this.cell = new Cell(gameArea);

    this.initFrame(gameArea);
}

Mainplayer.prototype.initFrame = function(gameArea) {
    this.frame.resize(window.innerWidth, window.innerHeight);

    this.frame.setParent(gameArea);

    var center = this.cell.getCoords();
    this.frame.setOrigin(center.getX() - this.frame.getWidth() / 2, center.getY() - this.frame.getHeight() / 2);
};

Mainplayer.prototype.getCell = function() {
    return this.cell;
};

Mainplayer.prototype.setTarget = function(x, y) {
    this.target.set(x, y);
};

Mainplayer.prototype.toJSON = function() {
    return {
        id: this.id,
        x: this.cell.getCoords().getX(),
        y: this.cell.getCoords().getY()
    };
};