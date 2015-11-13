function Pellet(canvas, spawnX, spawnY) {
    var x, y;

    x = (spawnX) ? spawnX : conf.getPelletSize() + Math.random() * (canvas.getWidth() - 2 * conf.getPelletSize());
    y = (spawnY) ? spawnY : conf.getPelletSize() + Math.random() * (canvas.getHeight() - 2 * conf.getPelletSize());

    this.canvas = canvas;
    this.coords = new D2Coordinate(x, y);
    this.color = Color.prototype.generateRandom();
    this.size = 10;
    this.sides = 6;
    this.value = 1;
}

Pellet.prototype.getCoords = function() {
    return this.coords;
};

Pellet.prototype.getValue = function() {
    return this.value;
};

Pellet.prototype.display = function() {
    if (this.canvas.constructor !== Canvas) {
        console.error("Display error : No canvas associated with this pellet");
    } else {
        this.canvas.drawPolygon(this.coords, this.size, this.sides, this.color);
    }
};

Pellet.prototype.toJSON = function() {
    return {
        x: this.coords.getX(),
        y: this.coords.getY()
    };
}