var current = {
  tool: '',
  draw: false,
  color: '',
  width: 0
}
var canvas = document.getElementById('paint');
var ctx = canvas.getContext('2d');
ctx.lineCap = 'round'; // 设置绘制线两端圆滑
ctx.lineJoin = 'round'; // 设置绘制线连接圆滑

setCanvasSize();
changeTool('pen');
changeColor('black');
changeWidth(2);

window.onresize = function() {
  setCanvasSize();
  ctx.lineWidth = current.width;
  ctx.strokeStyle = current.color;
}

// 绑定按钮事件
clear.onclick = clearCanvas;
download.onclick = saveImg;
pen.onclick = function() {
  changeTool('pen');
}
eraser.onclick = function() {
  changeTool('eraser');
}
black.onclick = function() {
  changeColor('black');
}
red.onclick = function() {
  changeColor('red');
}
green.onclick = function() {
  changeColor('green');
}
blue.onclick = function() {
  changeColor('blue');
}
width_2.onclick = function() {
  changeWidth(2);
}
width_4.onclick = function() {
  changeWidth(4);
}
width_8.onclick = function() {
  changeWidth(8);
}

// 重设Canvas标签大小，注意：
//（1）不是设置CSS，而是设置标签属性；
//（2）重设大小Canvas会清空重绘，需要先保存一下之前的；
function setCanvasSize() {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // 保存图片
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  ctx.putImageData(imageData, 0, 0); //重绘图片
}

// 清空画布
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 保存
function saveImg() {
  var dataURL = canvas.toDataURL();
  var aLink = document.createElement('a');
  aLink.download = '我的杰作';
  aLink.href = dataURL;
  aLink.target = '_blank';
  aLink.click();
}

// 颜色按钮点击函数
function changeColor(color) {
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  current.color = color;
  ctx.strokeStyle = color;
  changeWidthColor(color);
  switch (color) {
    case 'black':
      black.classList.add('active');
      break;
    case 'red':
      red.classList.add('active');
      break;
    case 'green':
      green.classList.add('active');
      break;
    case 'blue':
      blue.classList.add('active');
      break;
  }
}

// 线宽按钮点击函数
function changeWidth(width) {
  width_2.classList.remove('active');
  width_4.classList.remove('active');
  width_8.classList.remove('active');
  current.width = width;
  ctx.lineWidth = width;
  switch (width) {
    case 2:
      width_2.classList.add('active');
      break;
    case 4:
      width_4.classList.add('active');
      break;
    case 8:
      width_8.classList.add('active');
      break;
  }
}

// 改变当前工具，绘笔or橡皮擦
function changeTool(tool) {
  pen.classList.remove('active');
  eraser.classList.remove('active');
  current.tool = tool;
  switch (tool) {
    case 'pen':
      pen.classList.add('active');
      break;
    case 'eraser':
      eraser.classList.add('active');
      break;
  }
}

// 改变线宽按钮的颜色
function changeWidthColor(color) {
  width_2.classList.remove('black', 'red', 'blue', 'green');
  width_4.classList.remove('black', 'red', 'blue', 'green');
  width_8.classList.remove('black', 'red', 'blue', 'green');
  width_2.classList.add(color);
  width_4.classList.add(color);
  width_8.classList.add(color);
}

// 开始绘制
function startDraw(e) {
  current.draw = true;
  if (current.tool === 'pen') {
    ctx.beginPath();
    ctx.moveTo(e.x, e.y);
  }
}

// 绘制
function draw(e) {
  if (current.draw) {
    if (current.tool === 'pen') {
      ctx.lineTo(e.x, e.y);
      ctx.stroke();
    } else if (current.tool === 'eraser') {
      ctx.clearRect(e.x - 10, e.y - 10, 20, 20);
    }
  }
}

// 结束绘制
function stopDraw(e) {
  current.draw = false;
  if (current.tool === 'pen') {
    ctx.stroke();
    ctx.closePath();
  }
}

// 设备特性检测
if (document.body.ontouchstart !== undefined) {
  // 触屏设备
  //阻止默认的处理方式(阻止下拉滑动的效果)
  //passive 参数不能省略，用来兼容ios和android
  document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });

  canvas.ontouchstart = function(e) {
    var position = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
    startDraw(position);
  };
  canvas.ontouchmove = function(e) {
    var position = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
    draw(position);
  };
  canvas.ontouchend = function(e) {
    var position = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
    stopDraw(position);
  };
} else {
  // 桌面端
  canvas.onmousedown = function(e) {
    startDraw(e);
  };
  canvas.onmousemove = function(e) {
    draw(e);
  };
  canvas.onmouseup = function(e) {
    stopDraw(e);
  };
}