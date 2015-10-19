var Vector = function() {};
var Cell = function() {};
var Pellet = function() {};
var Canvas = function() {};

Vector.prototype = {
    _x : 0,
    _y : 0,
    getX : function() { return this._x; },
    getY : function() { return this._y; },
    setX : function(x) { this._x = x; },
    setY : function(y) { this._y = y; },
    addX : function(value) { this._x += value; },
    addY : function(value) { this._y += value; }
};

Cell.prototype = {
    _score : 0,
    _radius : 20,
    _speed : 5,
    _color : "#CC0000",
    _position : new Vector(),
    getPosition : function() { return this._position; },
    getSpeed : function() { return this._speed; },
    getRadius : function() { return this._radius; },
    getColor : function() { return this._color; },
    calculateVelocity : function(distance) {
        var velocity = new Vector();

        var euclidian = Math.sqrt(distance.getX() * distance.getX() + distance.getY() * distance.getY());

        if (euclidian == 0) {
            velocity.setX(0);
            velocity.setY(0);
        }
        else {
            velocity.setX((distance.getX() / euclidian) * this.getSpeed());
            velocity.setY((distance.getY() / euclidian) * this.getSpeed());

            if (Math.abs(distance.getX()) < Math.abs(velocity.getX())) {
                velocity.setX(distance.getX());
            }

            if (Math.abs(distance.getY()) < Math.abs(velocity.getY())) {
                velocity.setY(distance.getY());
            }
        }

        return velocity;
    },
    correctionBorders : function() {
        if (this.getPosition().getX() < this.getRadius()) {
            this.getPosition().setX(this.getRadius());
        }
        if (this.getPosition().getY() < this.getRadius()) {
            this.getPosition().setY(this.getRadius());
        }
        if (this.getPosition().getX() > background._size.getX() - this.getRadius() - frame._size.getX()) {
            this.getPosition().setX(background._size.getX() - this.getRadius() - frame._size.getY());
        }
        if (this.getPosition().getY() > background._size.getY() - this.getRadius()) {
            this.getPosition().getY(background._size.getY() - this.getRadius());
        }
    },
    move : function(destination) {
        var distance = new Vector();

        distance.setX(destination.getX() - this.getPosition().getX());
        distance.setY(destination.getY() - this.getPosition().getY());

        var velocity = this.calculateVelocity(distance);

        this.getPosition().addX(velocity.getX());
        this.getPosition().addY(velocity.getY());

        this.correctionBorders();
    },
    init : function() {
        this.getPosition().setX(background._size.getX()/2 - this.getRadius());
        this.getPosition().setY(background._size.getY()/2 - this.getRadius());

        drawBoard();
    },
    display : function(canvas) {
        canvas._context.clearRect(0, 0, canvas._size.getX(), canvas._size.getY());

        canvas._origin.setX(this.getPosition().getX() - canvas._size.getX() / 2);
        canvas._origin.setY(this.getPosition().getY() - canvas._size.getY() / 2);

        if (canvas._parent != null) {
            canvas._context.drawImage(canvas._parent._self, canvas.getOrigin().getX(), canvas.getOrigin().getY(),
                canvas.getSize().getX(), canvas.getSize().getY(), 0, 0, canvas.getSize().getX(), canvas.getSize().getY());
        }

        var relative_position = this.getRelativePosition(canvas);

        frame._context.fillStyle = this.getColor();
        frame._context.beginPath();
        frame._context.arc(relative_position.getX(), relative_position.getY(), this.getRadius(), 0, Math.PI*2);
        frame._context.fill();
        frame._context.closePath();
    },
    getRelativePosition : function(canvas) {
        var relative_position = new Vector();

        relative_position.setX(this.getPosition().getX() - canvas.getOrigin().getX());
        relative_position.setY(this.getPosition().getY() - canvas.getOrigin().getY());

        return relative_position;
    }
};

Pellet.prototype = {
    _radius : 5,
    _color : "#0000CC",
    _position : new Vector()
};

Canvas.prototype = {
    _self : null,
    _context : null,
    _parent : null,
    _origin : null,
    _size : null,
    draw : function() {},
    init : function() {
        this._origin = new Vector();
        this._size = new Vector();
    },
    resize : function(x, y) {
        this.getSize().setX(x);
        this.getSize().setY(y);

        this._self.width = this.getSize().getX();
        this._self.height = this.getSize().getY();
    },
    getOrigin : function() { return this._origin; },
    getSize : function() { return this._size; }
};

var background = new Canvas();
var frame = new Canvas();

background.init();
frame.init();

background._self = document.createElement('canvas');
background._context = background._self.getContext('2d');

frame._self = document.getElementById("view");
frame._context = frame._self.getContext('2d');
frame._parent = background;

frame.resize(window.innerWidth, window.innerHeight);
background.resize(3 * window.innerWidth, 3 * window.innerHeight);

var fps = 30;
var grid_size = 50;
var x;

function drawBoard(){
    background._context.beginPath();
    for (x = 0; x <= background._size.getX(); x += grid_size) {
        background._context.moveTo(x, 0);
        background._context.lineTo(x, background._size.getY());
    }

    for (x = 0; x <= background._size.getY(); x += grid_size) {
        background._context.moveTo(0, x);
        background._context.lineTo(background._size.getX(), x);
    }

    background._context.strokeStyle = "black";
    background._context.stroke();
    background._context.closePath();
}

function update(){
    cell.move(target);
    cell.display(frame);

    setTimeout(update, 1000/fps);
}

cell = new Cell();
var target = new Vector();
cell.init();
update();
//resize();

frame._self.addEventListener("mousemove", function(e){
    target.setX(e.pageX + frame.getOrigin().getX());
    target.setY(e.pageY + frame.getOrigin().getY());
});
