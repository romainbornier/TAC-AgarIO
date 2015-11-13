/* Utility class : Canvas toolbox */
// Gear drawing inspiration : Copyright (C) Ken Fyrstenberg / Epistemex

function Canvas(element) {
    this.html = element;
    this.context = element.getContext('2d');
    this.size = new D2Coordinate();
    this.origin = new D2Coordinate();
}

/* Getters and setters */
Canvas.prototype.getWidth = function() {
    return this.size.getX();
};

Canvas.prototype.getHeight = function() {
    return this.size.getY();
};

Canvas.prototype.getContext = function() {
    return this.context;
};

Canvas.prototype.getOrigin = function() {
    return this.origin;
};

Canvas.prototype.setOrigin = function(x, y) {
    this.origin.set(x, y);
};

/* Set the canvas object's properties and the corresponding html element's dimensions */
Canvas.prototype.resize = function(width, height) {
    this.size.setX(width);
    this.size.setY(height);

    this.html.width = this.getWidth();
    this.html.height = this.getHeight();
};

/* Additional shape : circle */
Canvas.prototype.drawCircle = function(coords, size, color, border, border_light, name) {
    this.context.beginPath();

    this.context.arc(coords.getX(), coords.getY(), size/2, 0, Math.PI*2);

    this.context.closePath();

    this.context.fillStyle = color.toHex();
    this.context.fill();

    if (border !== undefined) {
        this.context.lineWidth = border;
        this.context.strokeStyle = color.setLuminosity(border_light).toHex();
        this.context.stroke();
    }

    if (name !== undefined) {
        this.context.font = conf.getFont();
        var textWidth = this.context.measureText(name).width;
        this.context.fillStyle = color.setLuminosity(border_light).toHex();
        this.context.fillText(name, coords.getX() - textWidth/2, coords.getY() + 5);
    }
};

/* Additional shape : regular polygon */
Canvas.prototype.drawPolygon = function(coords, size, sides, color, border, border_light) {
    this.context.beginPath();

    this.context.moveTo(coords.getX() + size * Math.cos(0), coords.getY() + size * Math.sin(0));

    for (var i = 1; i <= sides; i++) {
        var angle = i * 2 * Math.PI / sides;
        this.context.lineTo(coords.getX() + size * Math.cos(angle), coords.getY() + size * Math.sin(angle));
    }

    this.context.closePath();

    this.context.fillStyle = color.toHex();
    this.context.fill();

    if (border !== undefined) {
        this.context.lineWidth = border;
        this.context.strokeStyle = color.setLuminosity(border_light).toHex();
        this.context.stroke();
    }
};

/*Canvas.prototype.drawGear = function(coords, size, notches, notches_size, color, border, border_light) {

    var angle = Math.PI*2 / (notches * 2),    // angle between notches
        taperAI = angle * 0.5,            // inner taper offset
        taperAO = angle * 0.5,            // outer taper offset
        a = angle,                      // iterator (angle)
        toggle = false;                 // notch radis (i/o)

    // starting point
    this.context.beginPath();
    this.context.moveTo(coords.getX() + (size+notches_size) * Math.cos(taperAO), coords.getY() + (size+notches_size) * Math.sin(taperAO));

    // loop
    for (; a <= Math.PI*2; a += angle) {
        // draw inner part
        if (toggle) {
            this.context.lineTo(coords.getX() + size * Math.cos(a - taperAI), coords.getY() + size * Math.sin(a - taperAI));
            this.context.lineTo(coords.getX() + (size+notches_size) * Math.cos(a + taperAO), coords.getY() + (size+notches_size) * Math.sin(a + taperAO));
        }
        // draw outer part
        else {
            this.context.lineTo(coords.getX() + (size+notches_size) * Math.cos(a - taperAO), coords.getY() + (size+notches_size) * Math.sin(a - taperAO));
            this.context.lineTo(coords.getX() + size * Math.cos(a + taperAI), coords.getY() + size * Math.sin(a + taperAI));
        }

        // switch
        toggle = !toggle;
    }

    // close the final line
    this.context.closePath();

    this.context.fillStyle = color.toHex();
    this.context.fill();

    if (border !== undefined) {
        this.context.lineWidth = border;
        this.context.strokeStyle = color.setLuminosity(border_light).toHex();
        this.context.stroke();
    }
};*/

/* Canvas reset */
Canvas.prototype.clean = function() {
    this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
};