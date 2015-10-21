var game = new Game(3 * window.innerWidth, 3 * window.innerHeight);
var background = new Canvas(document.createElement('canvas'), game.getWidth(), game.getHeight());
var frame = new Canvas(document.getElementById("view"), window.innerWidth, window.innerHeight);

frame.setParent(background);
game.setBackground(background);

background.init = function() {
    this.getContext().beginPath();

    for (var x = 0; x <= this.getWidth(); x += 50) {
        this.getContext().moveTo(x, 0);
        this.getContext().lineTo(x, this.getHeight());
    }

    for (var x = 0; x <= this.getHeight(); x += 50) {
        this.getContext().moveTo(0, x);
        this.getContext().lineTo(this.getWidth(), x);
    }

    this.getContext().strokeStyle = "#777777";
    this.getContext().lineWidth = 1;
    this.getContext().stroke();
    this.getContext().closePath();
}

background.init();

for (var i = 0; i < 30; i++) {
    game.spawnPellet();
}

game.displayPellet();

var c = new Cell(frame);

window.addEventListener('resize', resizeGame, false);

function resizeGame() {
    frame.resize(window.innerWidth, window.innerHeight);
    frame.display()
    c.display();
}

function update(){
    c.move(direction);

    frame.display();
    frame.drawGear(new D2Coordinate(150, 120), 100, 50, 5, new Color(0, 255, 0), 8, 0.8);
    c.display();

    setTimeout(update, 1000/game.getFps());
}

var direction = new D2Coordinate(0,0);

window.addEventListener("mousemove", function(e){
    direction.setX(e.pageX - c.getRelativeCoords().getX());
    direction.setY(e.pageY - c.getRelativeCoords().getY());
});

update();