function D2Coordinate(x, y) {
    this.x = (x) ? x:0;
    this.y = (y) ? y:0;
}

D2Coordinate.prototype.getX = function() {
    return this.x;
};

D2Coordinate.prototype.getY = function() {
    return this.y;
};

D2Coordinate.prototype.setX = function(x) {
    this.x = x;
};

D2Coordinate.prototype.setY = function(y) {
    this.y = y;
};

D2Coordinate.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
}

D2Coordinate.prototype.addX = function(value) {
    this.x += value;
};

D2Coordinate.prototype.addY = function(value) {
    this.y += value;
};

D2Coordinate.prototype.distance = function(coords) {
    var distanceX, distanceY;

    if (! coords) {
        coords = new D2Coordinate();
    }

    distanceX = this.x - coords.getX();
    distanceY = this.y - coords.getY();

    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
};