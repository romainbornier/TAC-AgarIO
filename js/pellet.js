function Pellet(canvas) {
    var x, y;
    x = canvas.getBorder().getX() + Math.random() * (canvas.getWidth() - 2 * canvas.getBorder().getX());
    y = canvas.getBorder().getY() + Math.random() * (canvas.getHeight() - 2 * canvas.getBorder().getY());

    this.canvas = canvas;
    this.coords = new D2Coordinate(x, y);
    this.color = Color.prototype.generateRandom();
    this.size = 10;
    this.sides = 6;
    this.value = 100;
}

Pellet.prototype.getCoords = function() {
    return this.coords;
};

Pellet.prototype.getSize = function() {
    return this.size;
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