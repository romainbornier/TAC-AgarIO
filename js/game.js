function Game(width, height) {
    this.fps = 60;
    this.size = new D2Coordinate(width, height);
    this.pellets = [];
    this.cells = [];
    this.background = null;
    this.frame = null;
    this.target = new D2Coordinate(0,0);
}

Game.prototype.getWidth = function() {
    return this.size.getX();
};

Game.prototype.getHeight = function() {
    return this.size.getY();
};

Game.prototype.setBackground = function(background) {
    if (background.constructor !== Canvas) {
        console.error("Type error : The background of the game must be a canvas");
    } else {
        this.background = background;
        this.background.getBorder().set(window.innerWidth / 2, window.innerHeight / 2);
    }
};

Game.prototype.setFrame = function(frame) {
    if (frame.constructor !== Canvas) {
        console.error("Type error : The frame of the game must be a canvas");
    } else {
        this.frame = frame;
        this.frame.getBorder().set(window.innerWidth / 2, window.innerHeight / 2);
    }
};

Game.prototype.spawnPellet = function() {
    this.pellets.push(new Pellet(this.background));
};

Game.prototype.spawnCell = function() {
    this.cells.push(new Cell(this.frame));
};

Game.prototype.displayPellet = function() {
    for (var pellet of this.pellets) {
        pellet.display();
    }
};

Game.prototype.displayCell = function() {
    for (var cell of this.cells) {
        cell.display();
    }
};

Game.prototype.init = function() {
    window.addEventListener("mousemove", function(e){
        this.target.set(e.pageX, e.pageY);
    }.bind(this), false);

    window.addEventListener("resize", function(){
        this.frame.resize(window.innerWidth, window.innerHeight);
    }.bind(this), false);

    this.background.init();

    for (var i = 0; i < 3000; i++) {
        this.spawnPellet();
    }

    this.spawnCell();

    this.displayPellet();

    this.update();
};

Game.prototype.update = function() {
    for (var cell of this.cells) {
        var direction = new D2Coordinate(this.target.getX(), this.target.getY());
        direction.addX(-cell.getRelativeCoords().getX());
        direction.addY(-cell.getRelativeCoords().getY());

        cell.move(direction);
    }

    frame.display();
    //frame.drawGear(new D2Coordinate(150, 120), 100, 50, 5, new Color(0, 255, 0), 8, 0.8);
    this.displayCell();

    setTimeout(this.update.bind(this), 1000 / this.fps);
};