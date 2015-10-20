function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype.toHex = function() {
    return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
};

Color.prototype.generateRandom = function() {
    return new Color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
}

Color.prototype.setLuminosity = function(ratio) {
    var r, g, b;
    r = this.r;
    g = this.g;
    b = this.b;

    if (ratio < 0) {
        console.error("Value error : ratio must be a positive value or 0");
    } else {
        r = Math.min(255, Math.round(r * ratio));
        g = Math.min(255, Math.round(g * ratio));
        b = Math.min(255, Math.round(b * ratio));
    }

    return new Color(r, g, b);
};