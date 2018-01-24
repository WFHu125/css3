var dom = document.getElementById("clock");//获取dom结构
var ctx = dom.getContext("2d");//该对象提供了用于在画布上绘图的方法和属性。
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem=width/200;//比例


function drawBackgroud() {
    ctx.save();
    ctx.translate(r, r);//重新映射画布上的 (0,0) 位置
    ctx.beginPath();//起始路径
    ctx.lineWidth = 10*rem;//设置或返回当前的线条宽度
    ctx.arc(0, 0, r - ctx.lineWidth/2, 0, 2 * Math.PI, false);//创建弧/曲线（用于创建圆形或部分圆）
    ctx.stroke();//绘制已定义的路径

    var houNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18*rem+"px Arial";//设置或返回文本内容的当前字体属性
    ctx.textAlign = "center";//设置或返回文本内容的当前对齐方式
    ctx.textBaseline = "middle";//设置或返回在绘制文本时使用的当前文本基线
    houNumbers.forEach(function (number, i) {
        //i为索引，number为数字
        var rad = 2 * Math.PI / 12 * i;//弧度 30°的弧度2*Math.PI/12
        var x = Math.cos(rad) * (r - 30*rem);//x坐标
        var y = Math.sin(rad) * (r - 30*rem);//有坐标
        ctx.fillText(number, x, y);//在画布上绘制被填充的文本
    });
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;//一分钟走10°
        var x = Math.cos(rad) * (r - 18*rem);
        var y = Math.sin(rad) * (r - 18*rem);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = "#000";
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = "#ccc";
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();//填充当前绘图（路径）
    }
}

function drawHour(hour, minute) {
    ctx.save();//保存当前环境的状态
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);//旋转当前绘图
    ctx.lineWidth = 6*rem;//设置或返回当前的线条宽度
    ctx.lineCap = "round";//设置或返回线条的结束端点样式
    ctx.moveTo(0, 10*rem);//把路径移动到画布中的指定点，不创建线条
    ctx.lineTo(0, -r / 2);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
    ctx.stroke();
    ctx.restore();//返回之前保存过的路径状态和属性
}

function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3*rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r + 30*rem);
    ctx.stroke();
    ctx.restore();
}
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#c14543";
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2*rem, 20*rem);
    ctx.lineTo(2*rem, 20*rem);
    ctx.lineTo(1, -r + 18*rem);
    ctx.lineTo(-1, -r + 18*rem);
    ctx.fill();
    ctx.restore();
}
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0, 3*rem, 0, 2 * Math.PI, false);
    ctx.fill();
}


function draw(){
    ctx.clearRect(0,0,width,height);
    var now=new Date();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    drawBackgroud();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}

draw();

setInterval(draw,1000);