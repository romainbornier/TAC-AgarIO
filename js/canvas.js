// Gear drawing inspiration : Copyright (C) Ken Fyrstenberg / Epistemex

function Canvas(html_element, width, height) {
    this.html = html_element;
    this.context = html_element.getContext('2d');
    this.size = new D2Coordinate(width, height);
    this.origin = new D2Coordinate(0,0);
    this.border = new D2Coordinate(0,0);
    this.parent = null;

    this.resize(width, height);
}

Canvas.prototype.getWidth = function() {
    return this.size.getX();
};

Canvas.prototype.getHeight = function() {
    return this.size.getY();
};

Canvas.prototype.getParent = function() {
    return this.parent;
};

Canvas.prototype.getContext = function() {
    return this.context;
};

Canvas.prototype.getHtml = function() {
    return this.html;
};

Canvas.prototype.getOrigin = function() {
    return this.origin;
};

Canvas.prototype.getBorder = function() {
    return this.border;
};

Canvas.prototype.setParent = function(parent) {
    if (parent.constructor !== Canvas) {
        console.error("Type error : The parent must be a canvas");
    } else {
        this.parent = parent;
    }
};

Canvas.prototype.resize = function(width, height) {
    this.size.setX(width);
    this.size.setY(height);

    this.html.width = this.getWidth();
    this.html.height = this.getHeight();
};

Canvas.prototype.drawCircle = function(coords, radius, color, border, border_light) {
    this.context.beginPath();

    this.context.arc(coords.getX(), coords.getY(), radius, 0, Math.PI*2);

    this.context.closePath();

    this.context.fillStyle = color.toHex();
    this.context.fill();

    if (border !== undefined) {
        this.context.lineWidth = border;
        this.context.strokeStyle = color.setLuminosity(border_light).toHex();
        this.context.stroke();
    }
};

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

Canvas.prototype.drawGear = function(coords, size, notches, notches_size, color, border, border_light) {

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
}

Canvas.prototype.display = function() {
    this.clean();

    if (this.parent && this.parent.constructor === Canvas) {
        this.context.drawImage(this.parent.html, this.origin.getX(), this.origin.getY(), this.getWidth(), this.getHeight(), 0, 0, this.getWidth(), this.getHeight());
    }
};

Canvas.prototype.clean = function() {
    this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
}