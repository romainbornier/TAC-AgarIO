/* Utility class : Player's messages reception and sending */
function MessageHandler(server) {
    this.server = server;
}

/* Elects an action based on the message's type */
MessageHandler.prototype.handle = function(message) {
    var pellets;

    switch(message.type) {
        case "game-state":
            if (! this.server.getGame().isReady()) {
                this.server.getGame().loadState(message.pellets);
            }

            if (! this.playersLoaded) {
                this.server.loadPlayers(message.players);
            }
            break;

        case "new-player":
            var players,
                newPlayer;

            players = this.server.getPlayers();
            newPlayer = JSON.parse(message.player);

            players[newPlayer.id] = new Player(newPlayer.id, this.server.getGame().getGameArea(), newPlayer.x, newPlayer.y);
            break;

        case "eat-pellet":
            pellets = this.server.getGame().getPellets();
            pellets.splice(message.index, 1);
            break;

        case "new-pellet":
            pellets = this.server.getGame().getPellets();
            pellets.push(new Pellet(this.server.getGame().getGameArea(), message.pellet.x, message.pellet.y));
            break;

        case "player-move":
            var players,
                movingPlayer;

            players = this.server.getPlayers();
            movingPlayer = players[message.player.id];
            movingPlayer.getCell().getCoords().set(message.player.x, message.player.y);
            break;
    }
};

/* Send a message through Cobra */
MessageHandler.prototype.send = function(message) {
    this.server.getCobra().sendMessage(message, this.server.getRoom(), false);
};