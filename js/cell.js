function Cell(canvas) {
    var x = canvas.getParent().getWidth() / 2;
    var y = canvas.getParent().getHeight() / 2;

    this.canvas = canvas;
    this.coords = new D2Coordinate(x, y);
    this.color = Color.prototype.generateRandom();
    this.radius = 30;
    this.speed = 20;
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

Cell.prototype.display = function() {
    if (this.canvas.constructor !== Canvas) {
        console.error("Display error : No canvas associated with this cell");
    } else {
        var relative_coords = this.getRelativeCoords();

        this.canvas.drawCircle(relative_coords, this.radius + 5, this.color.setLuminosity(0.7));
        this.canvas.drawCircle(relative_coords, this.radius, this.color);
    }
};

Cell.prototype.move = function(direction) {
    var velocity = new D2Coordinate();

    var euclidian = Math.sqrt(Math.pow(direction.getX(), 2) + Math.pow(direction.getY(), 2));

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

    correctedX = Math.max(this.coords.getX(), this.canvas.getWidth() / 2);
    correctedY = Math.max(this.coords.getY(), this.canvas.getHeight() / 2);

    correctedX = Math.min(correctedX, this.canvas.getParent().getWidth() - this.canvas.getWidth() / 2);
    correctedY = Math.min(correctedY, this.canvas.getParent().getHeight() - this.canvas.getHeight() / 2);

    this.coords.set(correctedX, correctedY);
};