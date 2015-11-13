function MainPlayer(id, name, gameArea) {
    this.id = id;
    this.target = new D2Coordinate();
    this.frame = new Canvas(document.getElementById("frame"));
    this.cell = new MainCell(this.frame, gameArea, name);

    this.initFrame(gameArea);
}

MainPlayer.prototype.getId = function() {
    return this.id;
};

MainPlayer.prototype.getCell = function() {
    return this.cell;
};

MainPlayer.prototype.initFrame = function(gameArea) {
    this.frame.resize(window.innerWidth, window.innerHeight);

    var center = this.cell.getCoords();

    this.frame.setOrigin(center.getX() + gameArea.getOrigin().getX() - this.frame.getWidth() / 2,
        center.getY() + gameArea.getOrigin().getY() - this.frame.getHeight() / 2);
};

MainPlayer.prototype.getFrame = function() {
    return this.frame;
};

MainPlayer.prototype.setTarget = function(x, y) {
    this.target.set(x, y);
};

MainPlayer.prototype.move = function() {
    var moveX = this.target.getX() - window.innerWidth / 2,
        moveY = this.target.getY() - window.innerHeight / 2,
        moveVector = new D2Coordinate(moveX, moveY),

        velocity = new D2Coordinate(),
        euclidian = moveVector.distance(),

        tempCoords = this.cell.getCoords();

    if (euclidian !== 0) {
        velocity.setX((moveVector.getX() / euclidian) * this.cell.getSpeed());
        velocity.setY((moveVector.getY() / euclidian) * this.cell.getSpeed());

        if (Math.abs(moveVector.getX()) < Math.abs(velocity.getX())) {
            velocity.setX(moveVector.getX());
        }

        if (Math.abs(moveVector.getY()) < Math.abs(velocity.getY())) {
            velocity.setY(moveVector.getY());
        }
    }

    tempCoords.addX(velocity.getX());
    tempCoords.addY(velocity.getY());

    tempCoords = this.cell.borderCorrectCoords(tempCoords);

    this.cell.getCoords().set(tempCoords.getX(), tempCoords.getY());
    this.frame.getOrigin().set(tempCoords.getX(), tempCoords.getY());
};

MainPlayer.prototype.resize = function() {
    this.frame.resize(window.innerWidth, window.innerHeight);
};

MainPlayer.prototype.toJSON = function() {
    return {
        id: this.id,
        x: this.cell.getCoords().getX(),
        y: this.cell.getCoords().getY()
    };
};