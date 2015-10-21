var game = new Game(3 * window.innerWidth, 3 * window.innerHeight);
var background = new Canvas(document.createElement('canvas'), game.getWidth(), game.getHeight());
var frame = new Canvas(document.getElementById("view"), window.innerWidth, window.innerHeight);

frame.setParent(background);
game.setBackground(background);
game.setFrame(frame);

background.init = function() {
    this.getContext().beginPath();

    for (var x = 0; x <= this.getWidth(); x += 50) {
        this.getContext().moveTo(x, 0);
        this.getContext().lineTo(x, this.getHeight());
    }

    for (var y = 0; y <= this.getHeight(); y += 50) {
        this.getContext().moveTo(0, y);
        this.getContext().lineTo(this.getWidth(), y);
    }

    this.getContext().strokeStyle = "#777777";
    this.getContext().lineWidth = 1;
    this.getContext().stroke();
    this.getContext().closePath();
};

game.init();