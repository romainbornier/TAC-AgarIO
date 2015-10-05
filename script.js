var bg_canvas = document.createElement('canvas');
var bg_ctx = bg_canvas.getContext('2d');

var canvas=document.getElementById("view"),
    ctx = view.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

bg_canvas.width = canvas.width * 3;
bg_canvas.height = canvas.height * 3;

var targetX = 0,
    targetY = 0;

var speed = 2,
    resizing = 1,
    fps = 60;

var grid_size = 50;

var cell = {
    rad : 5,
    color : "#CC0000",
    posX : 0,
    posY : 0,
    absPosX : 0,
    absPosY : 0,
    velX : 0,
    velY : 0
};

function drawBoard(){
    for (var x = 0; x <= bg_canvas.width; x += grid_size) {
        bg_ctx.moveTo(x, 0);
        bg_ctx.lineTo(x, bg_canvas.height);
    }

    for (var x = 0; x <= bg_canvas.height; x += grid_size) {
        bg_ctx.moveTo(0, x);
        bg_ctx.lineTo(bg_canvas.width, x);
    }

    bg_ctx.strokeStyle = "black";
    bg_ctx.stroke();
}

function init(cell) {
    cell.posX = canvas.width/2 - cell.rad;
    cell.posY = canvas.height/2 - cell.rad;

    cell.absPosX = bg_canvas.width/2;
    cell.absPosY = bg_canvas.height/2;

    drawBoard();
}

function displayCell(context, cell) {
    context.fillStyle = cell.color;
    context.beginPath();
    context.arc(cell.posX, cell.posY, cell.rad, 0, Math.PI*2);
    context.fill();
    context.closePath();
}

function update(){
    var tx = targetX - cell.posX,
        ty = targetY - cell.posY,
        dist = Math.sqrt(tx*tx+ty*ty);

    if (dist == 0 ) {
        cell.velX = 0;
        cell.velY = 0;
    }
    else {
        cell.velX = (tx/dist)*speed;
        cell.velY = (ty/dist)*speed;

        if (Math.abs(tx) < Math.abs(cell.velX)) {
            cell.velX = tx;
        }
        if (Math.abs(ty) < Math.abs(cell.velY)) {
            cell.velY = ty;
        }
    }

    cell.absPosX += cell.velX;
    cell.absPosY += cell.velY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bg_canvas, cell.absPosX, cell.absPosY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    displayCell(ctx, cell);

    setTimeout(update, 1000/fps);
}

function resize(){
    if (cell.rad <= 1 || cell.rad >= 10) {
        resizing *= -1;
    }

    cell.rad += resizing;

    setTimeout(resize, 100);
}

init(cell);
update();
resize();

canvas.addEventListener("mousemove", function(e){
    targetX = e.pageX;
    targetY = e.pageY;
});

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}