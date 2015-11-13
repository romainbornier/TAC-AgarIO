/* Utility class : View controller */
function Displayer() {
}

/* Display : The neutral pellets */
Displayer.prototype.displayPellet = function(pellets) {
    for (var i = 0; i < pellets.length; i++) {
        pellets[i].display();
    }
};

/* Display : The enemy players' cells */
Displayer.prototype.displayOpponents = function(players, mainPlayer) {
    for (var id in players) {
        if (players.hasOwnProperty(id) && id !== mainPlayer.getId()) {
            players[id].getCell().display();
        }
    }
};

/* Display : The main player's cell */
Displayer.prototype.displayMainPlayer = function(mainPlayer) {
    mainPlayer.getCell().display();
};

/* Cleanup previous loop */
Displayer.prototype.cleanCanvas = function(background, gameArea, frame) {
    background.clean();
    gameArea.clean();
    frame.clean();
};

/* Full redraw cycle */
Displayer.prototype.redraw = function(background, gameArea, frame, game, playerList) {
    var overlap;

    this.cleanCanvas(background, gameArea, frame);

    /* Redraw the background grid */
    background.init();
    frame.getContext().drawImage(background.html, frame.getOrigin().getX(), frame.getOrigin().getY(), frame.getWidth(), frame.getHeight(), 0, 0, frame.getWidth(), frame.getHeight());

    /* Redraw the pellets and opponents */
    this.displayPellet(game.getPellets());
    this.displayOpponents(playerList, game.getMainPlayer());

    overlap = this.correctOverlap(gameArea, frame);
    frame.getContext().drawImage(gameArea.html, overlap.sx, overlap.sy, overlap.swidth, overlap.sheight, overlap.x, overlap.y, overlap.swidth, overlap.sheight);

    this.displayMainPlayer(game.getMainPlayer());
};

/* Calculate the overlapping of the playable area and the view frame */
Displayer.prototype.correctOverlap = function(gameArea, frame) {
    var sx,
        sy,
        swidth,
        sheight,
        x,
        y;

    sx = Math.max(frame.getOrigin().getX() - gameArea.getOrigin().getX(), 0);
    sy = Math.max(frame.getOrigin().getY() - gameArea.getOrigin().getY(), 0);
    swidth = frame.getWidth();
    sheight = frame.getHeight();
    x = 0;
    y = 0;

    if (sx == 0) {
        x = gameArea.origin.getX() - frame.origin.getX();
        swidth -= x;
    }
    if (sy == 0) {
        y = gameArea.origin.getY() - frame.origin.getY();
        sheight -= y;
    }

    if (sx + swidth > gameArea.getWidth()) {
        swidth = gameArea.getWidth() - sx;
    }
    if (sy + sheight > gameArea.getHeight()) {
        sheight = gameArea.getHeight() - sy;
    }

    return {
        sx: sx,
        sy: sy,
        swidth: swidth,
        sheight: sheight,
        x: x,
        y: y
    };
};