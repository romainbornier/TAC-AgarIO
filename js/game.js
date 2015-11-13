function Game() {
    this.background = new Canvas(document.createElement("canvas"));
    this.gameArea = new Canvas(document.createElement("canvas"));
    this.mainPlayer = null;

    this.initGameArea();
    this.initBackground();

    this.pellets = [];

    this.ready = false;
}

/* Getters and setters */
Game.prototype.getGameArea = function() {
    return this.gameArea;
};

Game.prototype.getBackground = function() {
    return this.background;
};

Game.prototype.getMainPlayer = function() {
    return this.mainPlayer;
};

Game.prototype.setMainPlayer = function(player) {
    if (player === null || player.constructor !== MainPlayer) {
        console.error("Type error : The main player must be an instance of MainPlayer");
    } else {
        this.mainPlayer = player;
    }
};

Game.prototype.getPellets = function() {
    return this.pellets;
};

/* Initializer : game area */
Game.prototype.initGameArea = function() {
    this.gameArea.setOrigin(window.innerWidth/2, window.innerHeight/2);
    this.gameArea.resize(conf.getGameWidth(), conf.getGameHeight());
};

/* Initializer : background */
Game.prototype.initBackground = function() {
    if (this.background === null || this.background.constructor !== Canvas) {
        console.error("Type error : The background of the game must be a canvas");
    } else {
        this.background.init = function() {
            this.resize(conf.getGameWidth() + window.innerWidth, conf.getGameHeight() + window.innerHeight);

            var gridSize = conf.getGridSize();

            this.getContext().beginPath();

            for (var x = gridSize; x <= this.getWidth(); x += gridSize) {
                this.getContext().moveTo(x, 0);
                this.getContext().lineTo(x, this.getHeight());
            }

            for (var y = gridSize; y <= this.getHeight(); y += gridSize) {
                this.getContext().moveTo(0, y);
                this.getContext().lineTo(this.getWidth(), y);
            }

            this.getContext().strokeStyle = "#777777";
            this.getContext().lineWidth = 1;
            this.getContext().stroke();
            this.getContext().closePath();
        };
    }
};

/* First player : the pellets and randomly generated */
Game.prototype.init = function() {
    for (var i = 0; i < conf.getPelletQty(); i++) {
        this.spawnPellet();
    }

    this.ready = true;
};

/* Next players : use the same pellets */
Game.prototype.loadState = function(pellets) {
    for (var i = 0; i < pellets.length; i++) {
        var spawn = JSON.parse(pellets[i]);
        this.spawnPellet(spawn.x, spawn.y);
    }

    this.ready = true;
};

/* Place a pellet in the game, either randomly or at a set position */
Game.prototype.spawnPellet = function(x, y) {
    var newPellet = new Pellet(this.gameArea, x, y);
    this.pellets.push(newPellet);

    return newPellet;
};

Game.prototype.isReady = function() {
    return this.ready;
};

/* Resize the different canvas and adjust their borders */
Game.prototype.resize = function() {
    var oldWidth,
        oldHeight,

        deltaWidth,
        deltaHeight;

    oldWidth = this.background.getWidth();
    oldHeight = this.background.getHeight();

    this.background.resize(conf.getGameWidth() + window.innerWidth, conf.getGameHeight() + window.innerHeight);

    deltaWidth = this.background.getWidth() - oldWidth;
    deltaHeight = this.background.getHeight() - oldHeight;

    this.mainPlayer.getFrame().getOrigin().addX(deltaWidth / 2);
    this.mainPlayer.getFrame().getOrigin().addY(deltaHeight / 2);

    this.initGameArea();
};