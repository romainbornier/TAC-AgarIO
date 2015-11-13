/* Utility class : Parser */
function Parser() {
}

/* Look for a parameter in the URL */
Parser.prototype.lookupParam = function(val) {
    var result = "anonymous",
        tmp = [];
    var items = location.search.substr(1).split("&");

    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    }
    return result;
};

/* Look for a parameter in the URL */
Parser.prototype.parseUrl = function() {
    return {
        "name": this.lookupParam("name"),
        "room": this.lookupParam("room")
    };
};