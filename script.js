// create img for every size
let width = "1440";
let height = "2960";

if (window.screen.width >= 1024) {
  width = "1920";
  height = "1080";
} else if (window.screen.width >= 768) {
  width = "2048";
  height = "1536";
} else {
  width = "1440";
  height = "2960";
}

var img = new Image();
img.src = `https://picsum.photos/${width}/${height}`;
img.crossOrigin = "Anonymous"

// create canvas with the image as a background and add the caption from using the API
var canvas = document.getElementById("canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
var ctx = canvas.getContext("2d");
img.onload = drawImageScaled.bind(null, img, ctx);

function generateRanodmNum(max) {
  return Math.floor(Math.random() * max);
}

let txt = "";
let lines = [];

fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((res) => {
    txt = res[generateRanodmNum(res.length - 1)].text;
    lines = txt.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,2}\b/g);
  })
  .catch((err) => err);

function drawImageScaled(img, ctx) {
  canvas = ctx.canvas;

  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 17;
  var lineheight = 50;
  ctx.font = "170px Fearlessly";
  ctx.lineWidth = 7;
  let offset = 750



  if (window.screen.width >= 1024) {
    ctx.font = "60px Fearlessly";
   lineheight = 60;
   ctx.shadowBlur = 5;
    ctx.lineWidth = 7;
    offset = 250
  } 
 else if (window.screen.width >= 768) {
    ctx.font = "100px Fearlessly";
    lineheight = 100;
    ctx.shadowBlur = 5;
     ctx.lineWidth = 7;
     offset = 350
  } else {
  ctx.font = "170px Fearlessly";
   lineheight = 150;
  ctx.lineWidth = 7;
  offset = 750
  }


  for (i = 0; i < lines.length; i++) {
    ctx.strokeText(
      lines[i],
      canvas.width / 2,
      canvas.height / 2 + i * lineheight - offset
    );
    ctx.fillText(
      lines[i],
      canvas.width / 2,
      canvas.height / 2 + i * lineheight - offset
    );
  }
}


function save(){

if(window.navigator.msSaveBlob){
  window.navigator.msSaveBlob(canvas.msToBlob(), 'image.png')
}else {
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = canvas.toDataURL()
  a.download = 'Wallpaper.png'
  a.click()
  document.body.removeChild(a)
}
}



