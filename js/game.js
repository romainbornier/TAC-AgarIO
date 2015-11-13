function Game() {
    this.background = new Canvas(document.createElement("canvas"));
    this.gameArea = new Canvas(document.createElement("canvas"));

    this.initGameArea();
    this.initBackground();

    this.pellets = [];

    this.ready = false;
}

Game.prototype.getGameArea = function() {
    return this.gameArea;
};

Game.prototype.getBackground = function() {
    return this.background;
};

Game.prototype.initGameArea = function() {
    this.gameArea.setOrigin(window.innerWidth/2, window.innerHeight/2);
    this.gameArea.resize(conf.getGameWidth(), conf.getGameHeight());
};

Game.prototype.initBackground = function() {
    if (this.background === null || this.background.constructor !== Canvas) {
        console.error("Type error : The background of the game must be a canvas");
    } else {
        this.background.resize(conf.getGameWidth() + window.innerWidth, conf.getGameHeight() + window.innerHeight);

        var gridSize = conf.getGridSize();

        this.background.getContext().beginPath();

        for (var x = gridSize; x <= this.background.getWidth(); x += gridSize) {
            this.background.getContext().moveTo(x, 0);
            this.background.getContext().lineTo(x, this.background.getHeight());
        }

        for (var y = gridSize; y <= this.background.getHeight(); y += gridSize) {
            this.background.getContext().moveTo(0, y);
            this.background.getContext().lineTo(this.background.getWidth(), y);
        }

        this.background.getContext().strokeStyle = "#777777";
        this.background.getContext().lineWidth = 1;
        this.background.getContext().stroke();
        this.background.getContext().closePath();
    }
};

Game.prototype.init = function() {
    for (var i = 0; i < conf.getPelletQty(); i++) {
        this.spawnPellet();
    }

    this.ready = true;
};

Game.prototype.loadState = function(pellets) {
    for (var i = 0; i < pellets.length; i++) {
        var spawn = JSON.parse(pellets[i]);
        this.spawnPellet(spawn.x, spawn.y);
    }

    this.ready = true;
};

Game.prototype.isReady = function() {
    return this.ready;
};

/*
Game.prototype.update = function() {
    if (this.multiplayer.ready == true) {
        var cell = this.getPlayer().getCell();

        var direction = new D2Coordinate(this.target.getX(), this.target.getY());
        direction.addX(-cell.getRelativeCoords().getX());
        direction.addY(-cell.getRelativeCoords().getY());

        cell.move(direction);

        for (var i = this.getPellets().length - 1; i >= 0; i--) {
            if (cell.isOverPellet(this.getPellets()[i])) {
                cell.eatPellet(this.getPellets()[i]);
                this.getPellets().splice(i, 1);
            }
        }

        var content = {"id" : this.getPlayer().id, "x" : cell.getCoords().getX(), "y" : cell.getCoords().getY()};

        this.multiplayer.sendMessage({"type" : "position", "content" : content});

        background.display();
        background.init();

        this.displayPellet();

        frame.display();
        //frame.drawGear(new D2Coordinate(150, 120), 100, 50, 5, new Color(0, 255, 0), 8, 0.8);
        this.multiplayer.displayCell();
    }

    setTimeout(this.update.bind(this), 1000 / this.fps);
};
*/
Game.prototype.spawnPellet = function(x, y) {
    this.pellets.push(new Pellet(this.gameArea, x, y));
};

Game.prototype.displayPellet = function() {
    for (var i = 0; i < this.pellets.length; i++) {
        this.pellets[i].display();
    }
};