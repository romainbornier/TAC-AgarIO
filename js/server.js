function Server() {
    this.cobra = null;

    this.game = null;

    this.players = [];
    this.mainplayer = null;

    this.playersLoaded = false;

    this.init();
}

Server.prototype.init = function() {
    this.cobra = new Cobra();
    this.cobra.connect('http://cobra-framework.com:8080');

    this.cobra.connectionCallback = function() {
        this.cobra.joinRoom(conf.getRoom());
    }.bind(this);

    this.cobra.joinRoomCallback = function(roomName) {
    }.bind(this);

    this.cobra.messageReceivedCallback = function(message) {
        if (message.type == "infos" && message.clients) { // Message recu par le joueur quand il rejoint
            this.game = new Game();
            this.mainplayer = new Mainplayer(message.socketId, this.game.getGameArea());
            this.players[message.socketId] = this.mainplayer;

            window.addEventListener("mousemove", function(e){
                this.mainplayer.setTarget(e.pageX, e.pageY);
            }.bind(this), false);

            var spawnMessage = {
                type: "new-player",
                player: JSON.stringify(this.mainplayer)
            };

            this.sendMessage(spawnMessage);

            if (message.clients.length === 1) { // Premier joueur, on initialise la partie
                this.game.init();
                this.playersLoaded = true;
            }

            this.update();
        }
        else if (message.room === conf.getRoom()) {
            this.handleMessage(message.message);
            /*var message = message.message;

            if (message.type == "position") {
                this.players[message.content.id].getCell().getCoords().setX(message.content.x);
                this.players[message.content.id].getCell().getCoords().setY(message.content.y);
            }*/
        }
    }.bind(this);

    this.cobra.clientJoinedRoomCallback = function(data) {
        var message = {
            type: "game-state",
            pellets: this.game.pellets.map(JSON.stringify),
            players: this.listPlayers()
        };

        this.sendMessage(message);
    }.bind(this);

    this.cobra.clientLeftRoomCallback = function(data) {
        delete this.players[data.id];
    }.bind(this);
};

Server.prototype.sendMessage = function(message) {
    this.cobra.sendMessage(message, conf.getRoom(), false);
};

Server.prototype.handleMessage = function(message) {
    switch(message.type) {
        case "game-state":
            if (! this.game.isReady()) {
                this.game.loadState(message.pellets);
            }

            if (! this.playersLoaded) {
                this.loadPlayers(message.players);
            }
            break;

        case "new-player":
            var newPlayer = JSON.parse(message.player);
            this.players[newPlayer.id] = new Player(newPlayer.id, this.game.getGameArea(), newPlayer.x, newPlayer.y);
            break;
    }
};

Server.prototype.listPlayers = function() {
    var list = new Array();

    for (var id in this.players) {
        if (this.players.hasOwnProperty(id)) {
            list.push(JSON.stringify(this.players[id]));
        }
    }

    return list;
}

Server.prototype.loadPlayers = function(players) {
    console.log(players);
    for (var i = 0; i < players.length; i++) {
        var player = JSON.parse(players[i]);

        this.players[player.id] = new Player(player.id, this.game.getGameArea(), player.x, player.y);
    }

    this.playersLoaded = true;
};

Server.prototype.displayCell = function() {
    //console.log(this.listPlayers());
    for (var id in this.players) {
        if (this.players.hasOwnProperty(id)) {
            this.players[id].getCell().display();
        }
    }
};

Server.prototype.update = function() {
    this.game.displayPellet();
    this.displayCell();

    setTimeout(this.update.bind(this), 1000 / conf.getFps());
};