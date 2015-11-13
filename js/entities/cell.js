function Cell(canvas, spawnX, spawnY) {
    var x, y;

    this.canvas = canvas;
    this.color = Color.prototype.generateRandom();
    this.score = conf.getCellStartScore();
    this.setMass(this.score);

    var displaySize = this.size * conf.getGridSize();
    x = (spawnX) ? spawnX : displaySize + Math.random() * (canvas.getWidth() - 2 * displaySize);
    y = (spawnY) ? spawnY : displaySize + Math.random() * (canvas.getHeight() - 2 * displaySize);

    this.coords = new D2Coordinate(x, y);
}

Cell.prototype.getCoords = function() {
    return this.coords;
};

Cell.prototype.getRelativeCoords = function() {
    var x, y;

    x = Math.min(this.coords.getX(), this.canvas.getWidth() / 2);
    if (this.canvas.getOrigin().getX() == this.canvas.getParent().getWidth() - this.canvas.getWidth()) {
        x = Math.max(x, this.coords.getX() - this.canvas.getOrigin().getX());
    }

    y = Math.min(this.coords.getY(), this.canvas.getHeight() / 2);
    if (this.canvas.getOrigin().getY() == this.canvas.getParent().getHeight() - this.canvas.getHeight()) {
        y = Math.max(y, this.coords.getY() - this.canvas.getOrigin().getY());
    }

    return new D2Coordinate(x, y);
};

Cell.prototype.setMass = function(value) {
    this.mass = value;
    this.size = Math.sqrt(value / 6.25);
    this.speed = 10/this.size;
    this.score = Math.max(this.score, this.mass);
};

Cell.prototype.display = function() {
    if (this.canvas.constructor !== Canvas) {
        console.error("Display error : No canvas associated with this cell");
    } else {
        this.canvas.drawCircle(this.coords, this.size * conf.getGridSize(), this.color, 5, 0.7);
    }
};

Cell.prototype.move = function(direction) {
    var velocity = new D2Coordinate();

    var euclidian = direction.distance(new D2Coordinate(0,0));

    if (euclidian == 0) {
        velocity.setX(0);
        velocity.setY(0);
    }
    else {
        velocity.setX((direction.getX() / euclidian) * this.speed);
        velocity.setY((direction.getY() / euclidian) * this.speed);

        if (Math.abs(direction.getX()) < Math.abs(velocity.getX())) {
            velocity.setX(direction.getX());
        }

        if (Math.abs(direction.getY()) < Math.abs(velocity.getY())) {
            velocity.setY(direction.getY());
        }
    }

    this.coords.addX(velocity.getX());
    this.coords.addY(velocity.getY());

    this.borderCorrectCoords();
    this.reframeCanvas();
};

Cell.prototype.reframeCanvas = function() {
    var originX, originY;

    originX = Math.max(0, this.coords.getX() - this.canvas.getWidth() / 2);
    originX = Math.min(originX, this.canvas.getParent().getWidth() - this.canvas.getWidth());

    originY = Math.max(0, this.coords.getY() - this.canvas.getHeight() / 2);
    originY = Math.min(originY, this.canvas.getParent().getHeight() - this.canvas.getHeight());

    this.canvas.getOrigin().set(originX, originY);
};

Cell.prototype.borderCorrectCoords = function() {
    var correctedX, correctedY;

    correctedX = Math.max(this.coords.getX(), this.canvas.getBorder().getX());
    correctedY = Math.max(this.coords.getY(), this.canvas.getBorder().getY());

    correctedX = Math.min(correctedX, this.canvas.getParent().getWidth() - this.canvas.getBorder().getX());
    correctedY = Math.min(correctedY, this.canvas.getParent().getHeight() - this.canvas.getBorder().getY());

    this.coords.set(correctedX, correctedY);
};

Cell.prototype.isOverPellet = function(pellet) {
    return (this.getCoords().distance(pellet.getCoords()) < (this.size * this.canvas.getParent().squareSize / 2));
};

Cell.prototype.eatPellet = function(pellet) {
    this.setMass(this.mass + pellet.getValue());
};
