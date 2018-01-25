var can, ctx, w, h;

var girlPic = new Image();
var starPic = new Image();

var num = 60;
var stars = [];

var lastTime;//上一次刷新的时间
var deltaTime;//两帧时间间隔

var switchy=false;
var life=0;

function init() {
    can = document.getElementById("star");
    ctx = can.getContext("2d");
    w = can.width;
    h = can.height;

    document.addEventListener("mousemove",mousemove);

    girlPic.src = "img/girl.jpg";
    starPic.src = "img/star.png";

    for (var i = 0; i < num; i++) {
        var obj = new starObj();
        stars.push(obj);
        stars[i].init();
    }

    lastTime = Date.now();
    gameLoop();
}



function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    drawBackground();//绘制背景
    drawGirl();
    drawStars();
    aliveUpdate();
}

function drawBackground() {
    ctx.fillStyle = "#393550";
    ctx.fillRect(0, 0, w, h);//绘制“被填充”的矩形
}

function drawGirl() {
    //drawImage(img,x,y,width,height)
    //x轴坐标正方向向右，y轴坐标正方向向下
    ctx.drawImage(girlPic, 100, 150, 600, 300);
}

function mousemove(e){
    if(e.offsetX || e.offsetY){
        var px=e.offsetX==undefined?e.layerX:e.offsetX;
        var py=e.offsetY==undefined?e.layerY:e.offsetY;
        if(px>100&&px<700&&py>150&&py<450){
            switchy=true;
        }else{
            switchy=false;
        }
    }
}
document.body.onload = init;