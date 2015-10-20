function Canvas(html_element, parent, width, height) {
    this.html = html_element;
    this.context = html_element.getContext('2d');
    this.parent = parent;
    this.size = new D2Coordinate(width, height);
    this.origin = new D2Coordinate(0,0);

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

Canvas.prototype.resize = function(width, height) {
    this.size.setX(width);
    this.size.setY(height);

    this.html.width = this.getWidth();
    this.html.height = this.getHeight();
};

Canvas.prototype.drawCircle = function(coords, radius, color) {
    this.context.beginPath();

    this.context.arc(coords.getX(), coords.getY(), radius, 0, Math.PI*2);

    this.context.fillStyle = color.toHex();
    this.context.fill();
    this.context.closePath();
};

Canvas.prototype.drawPolygon = function(coords, size, sides, color) {
    this.context.beginPath();

    this.context.moveTo(coords.getX() + size * Math.cos(0), coords.getY() + size * Math.sin(0));

    for (var i = 1; i <= sides; i++) {
        var angle = i * 2 * Math.PI / sides;
        this.context.lineTo(coords.getX() + size * Math.cos(angle), coords.getY() + size * Math.sin(angle));
    }

    this.context.fillStyle = color.toHex();
    this.context.fill();
    this.context.closePath();
};

Canvas.prototype.display = function() {
    this.clean();

    if (this.parent && this.parent.constructor === Canvas) {
        this.context.drawImage(this.parent.html, this.origin.getX(), this.origin.getY(), this.getWidth(), this.getHeight(), 0, 0, this.getWidth(), this.getHeight());
    }
};

Canvas.prototype.clean = function() {
    this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
}