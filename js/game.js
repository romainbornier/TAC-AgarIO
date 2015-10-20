var background = new Canvas(document.createElement('canvas'), null, 3 * window.innerWidth, 3 * window.innerHeight);
var frame = new Canvas(document.getElementById("view"), background, window.innerWidth, window.innerHeight);

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
    var p = new Pellet(background, frame.getWidth() / 2, frame.getHeight() / 2, background.getWidth() - frame.getWidth() / 2, background.getHeight() - frame.getHeight() / 2);
    p.display();
}

var c = new Cell(frame);

frame.display()
c.display();

window.addEventListener('resize', resizeGame, false);

function resizeGame() {
    frame.resize(window.innerWidth, window.innerHeight);
    frame.display()
    c.display();
}

var fps = 30;

function update(){
    c.move(direction);

    frame.display();
    c.display();

    console.log(c.getCoords());

    setTimeout(update, 1000/fps);
}

var direction = new D2Coordinate(0,0);

window.addEventListener("mousemove", function(e){
    direction.setX(e.pageX - c.getRelativeCoords().getX());
    direction.setY(e.pageY - c.getRelativeCoords().getY());
});

update();