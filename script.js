var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "#EEEEEE";
ctx.fillRect(0, 0, 500, 500);

function drawArrow(degree) {
  const radian = (degree / 180) * Math.PI;

  const startX = 250;
  const startY = 400;
  const endX = 250 - 200 * Math.cos(radian);
  const endY = 400 - 200 * Math.sin(radian);

  // Arrow body
  ctx.strokeStyle = "#EE3333";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Arrow head
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX + 15 * Math.cos(radian), endY + 15 * Math.sin(radian));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

for (let i = 0; i <= 4; i++) {
  drawArrow(i * 45);
}
