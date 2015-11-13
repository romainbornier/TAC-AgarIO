function Server(params) {
    this.cobra = new Cobra();
    this.room = params.room;
    this.game = new Game();

    this.players = [];
    this.playersLoaded = false;

    this.messageHandler = new MessageHandler(this);
    this.displayer = new Displayer();

    this.init(params.name, params.room);
}

/* Getters */
Server.prototype.getCobra = function() {
    return this.cobra;
};

Server.prototype.getRoom = function() {
    return this.room;
};

Server.prototype.getGame = function() {
    return this.game;
};

Server.prototype.getPlayers = function() {
    return this.players;
};

Server.prototype.init = function(name, room) {
    /* Connect to the Cobra website */
    this.cobra.connect('http://cobra-framework.com:8080');

    /* Cobra callback function : Connection */
    this.cobra.connectionCallback = function() {
        this.cobra.joinRoom(room);
    }.bind(this);

    /* Cobra callback function : Join Room */
    this.cobra.joinRoomCallback = function(roomName) {
    }.bind(this);

    /* Cobra callback function : Receive Message */
    this.cobra.messageReceivedCallback = function(message) {
        /* Message received from Cobra upon connecting */
        if (message.type == "infos") {
            var id,
                newPlayer;

            id = message.socketId;
            newPlayer = new MainPlayer(id, name, this.game.getGameArea());

            /* Track the player's mouse */
            window.addEventListener("mousemove", function(e){
                newPlayer.setTarget(e.pageX, e.pageY);
            }.bind(this), false);

            /* Update the different canvas upon resize */
            window.addEventListener("resize", function(){
                this.game.resize();
            }.bind(this), false);

            /* Warn the other players about the newcomer */
            var spawnMessage = {
                type: "new-player",
                player: JSON.stringify(newPlayer)
            };
            this.messageHandler.send(spawnMessage);

            /* First player in the room, initialize the game */
            if (message.clients.length === 1) {
                this.game.init();
                this.playersLoaded = true; // No other player to store
            }

            /* Set the new player as the main player in his instance, and store him */
            this.game.setMainPlayer(newPlayer);
            this.players[id] = newPlayer;

            this.update();
        }
        /* Message sent by a player */
        else if (message.room === room) {
            this.messageHandler.handle(message.message);
        }
    }.bind(this);

    /* Cobra callback function : Client Joined Room */
    this.cobra.clientJoinedRoomCallback = function() {
        /* Send the current state of the game to the newcomer */
        var message = {
            type: "game-state",
            pellets: this.game.pellets.map(JSON.stringify),
            players: this.listPlayers()
        };

        this.messageHandler.send(message);
    }.bind(this);

    /* Cobra callback function : Client Left Room */
    this.cobra.clientLeftRoomCallback = function(data) {
        /* Removes the player who left from the list */
        delete this.players[data.id];
    }.bind(this);
};

/* Puts the minimum required info about the players in a regular Array */
Server.prototype.listPlayers = function() {
    var list = [];

    for (var id in this.players) {
        if (this.players.hasOwnProperty(id)) {
            list.push(JSON.stringify(this.players[id]));
        }
    }

    return list;
};

/* Stores all the current players when joining an existing game */
Server.prototype.loadPlayers = function(players) {
    for (var i = 0; i < players.length; i++) {
        var player = JSON.parse(players[i]);

        this.players[player.id] = new Player(player.id, this.game.getGameArea(), player.x, player.y);
    }

    this.playersLoaded = true;
};

Server.prototype.checkPellets = function() {
    var playerCell = this.game.getMainPlayer().getCell(),
        pellets = this.game.getPellets(),
        message;

    for (var i = 0; i < pellets.length; i++) {
        if (playerCell.isOverPellet(pellets[i])) {
            playerCell.eatPellet(pellets[i]);
            pellets.splice(i,1);

            message = {
                type: "eat-pellet",
                index: i
            };

            this.messageHandler.send(message);

            var newPellet = this.game.spawnPellet(this.game.getGameArea());

            /* Send the current state of the game to the newcomer */
            message = {
                type: "new-pellet",
                pellet: newPellet
            };

            this.messageHandler.send(message);
        }
    }
};

/* Main loop */
Server.prototype.update = function() {
    var background,
        gameArea,
        frame,
        message;

    /* The player chooses a direction and informs the other players */
    this.game.getMainPlayer().move();

    message = {
        type: "player-move",
        player: this.game.getMainPlayer()
    };

    this.messageHandler.send(message);

    this.checkPellets();

    background = this.game.getBackground();
    gameArea = this.game.getGameArea();
    frame = this.game.getMainPlayer().getFrame();

    /* Takes into account the other players' moves and kills to update the board */
    this.displayer.redraw(background, gameArea, frame, this.game, this.players);

    /* Callback */
    setTimeout(this.update.bind(this), 1000 / conf.getFps());
};