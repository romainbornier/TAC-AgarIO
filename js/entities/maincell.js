function MainCell(canvas, game) {
    var x, y;

    this.canvas = canvas;
    this.area = game;
    this.color = Color.prototype.generateRandom();
    this.score = conf.getCellStartScore();
    this.setMass(this.score);

    var displaySize = this.getDisplaySize();
    x = displaySize + Math.random() * (game.getWidth() - 2 * displaySize);
    y = displaySize + Math.random() * (game.getHeight() - 2 * displaySize);

    this.coords = new D2Coordinate(x, y);
}

MainCell.prototype.setMass = function(value) {
    this.mass = value;
    this.size = Math.sqrt(value / 6.25);
    this.speed = 10/this.size;
    this.score = Math.max(this.score, this.mass);
};

MainCell.prototype.getCoords = function() {
    return this.coords;
};

MainCell.prototype.getSpeed = function() {
    return this.speed;
};

MainCell.prototype.getDisplaySize = function() {
    return this.size * conf.getGridSize();
};

MainCell.prototype.display = function() {
    if (this.canvas.constructor !== Canvas) {
        console.error("Display error : No canvas associated with this cell");
    } else {
        var relativeCoords = new D2Coordinate(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2);
        this.canvas.drawCircle(relativeCoords, this.getDisplaySize(), this.color, 5, 0.7);
    }
};

MainCell.prototype.borderCorrectCoords = function(coords) {
    var correctedX, correctedY;

    correctedX = Math.max(coords.getX(), this.getDisplaySize() / 2 + 5);
    correctedY = Math.max(coords.getY(), this.getDisplaySize() / 2 + 5);

    correctedX = Math.min(correctedX, this.area.getWidth() - this.getDisplaySize() / 2 - 5);
    correctedY = Math.min(correctedY, this.area.getHeight() - this.getDisplaySize() / 2 - 5);

    return new D2Coordinate(correctedX, correctedY);
};