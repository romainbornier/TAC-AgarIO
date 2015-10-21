function Game(width, height) {
    this.fps = 60;
    this.size = new D2Coordinate(width, height);
    this.pellets = [];
    this.cells = [];
    this.background = null;
}

Game.prototype.getWidth = function() {
    return this.size.getX();
};

Game.prototype.getHeight = function() {
    return this.size.getY();
};

Game.prototype.getFps = function() {
    return this.fps;
};

Game.prototype.setBackground = function(background) {
    if (background.constructor !== Canvas) {
        console.error("Type error : The background of the game must be a canvas");
    } else {
        this.background = background;
        this.background.getBorder().set(window.innerWidth / 2, window.innerHeight / 2);
    }
};

Game.prototype.spawnPellet = function() {
    this.pellets.push(new Pellet(this.background));
};

Game.prototype.displayPellet = function() {
    for (var pellet of this.pellets) {
        pellet.display();
    }
};

/*Game.prototype.update = function() {
    c.move(direction);

    frame.display();
    c.display();

    console.log(c.getCoords());

    setTimeout(update, 1000/fps);
};*/