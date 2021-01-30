var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.translate(250, 250);
ctx.rotate((180 / 180) * Math.PI);

function drawBackground() {
  ctx.fillStyle = "#EEEEEE";

  ctx.beginPath();
  ctx.arc(0, 0, 250, 0, 2 * Math.PI, false);
  ctx.fill();

  for (let i = 0; i < 12; i++) {
    const radian = (i / 6) * Math.PI;
    console.log(radian);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(220 * Math.cos(radian), 220 * Math.sin(radian));
    ctx.lineTo(240 * Math.cos(radian), 240 * Math.sin(radian));
    ctx.stroke();
  }

  for (let i = 0; i < 60; i++) {
    const radian = (i / 30) * Math.PI;
    console.log(radian);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(230 * Math.cos(radian), 230 * Math.sin(radian));
    ctx.lineTo(240 * Math.cos(radian), 240 * Math.sin(radian));
    ctx.stroke();
  }
}

function drawArrow(degree) {
  const radian = (degree / 180) * Math.PI;
  const radianR = (135 / 180) * Math.PI;
  const radianL = (-135 / 180) * Math.PI;

  const startX = 0;
  const startY = 0;
  const endX = 200 * Math.cos(radian);
  const endY = 200 * Math.sin(radian);

  // Arrow body
  ctx.strokeStyle = "#EE3333";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Arrow head
  ctx.beginPath();
  ctx.lineTo(
    endX - 3 * Math.cos(radian + radianR),
    endY - 3 * Math.sin(radian + radianR)
  );
  ctx.lineTo(
    endX + 20 * Math.cos(radian + radianR),
    endY + 20 * Math.sin(radian + radianR)
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.lineTo(
    endX - 3 * Math.cos(radian + radianL),
    endY - 3 * Math.sin(radian + radianL)
  );
  ctx.lineTo(
    endX + 20 * Math.cos(radian + radianL),
    endY + 20 * Math.sin(radian + radianL)
  );
  ctx.stroke();
}

let gameState = {
  prevTime: 0,
  prevTheta: 0,

  theta: 0,
  omega: 0,
  alpha: 0,

  P: 0,
  I: 0,
  D: 0,

  desiredTheta: 180,
};

const Kp = 0.3;
const Ki = 0.007;
const Kd = 6;

const K = 0.001;

function PID_Control(gameState, deltaTime) {
  gameState["theta"] = gameState["theta"] + gameState["omega"];
  gameState["omega"] = gameState["omega"] + gameState["alpha"];

  const error = gameState["desiredTheta"] - gameState["theta"];

  gameState["P"] = deltaTime * Kp * error;
  gameState["I"] = deltaTime * Ki * error + gameState["I"];
  gameState["D"] =
    deltaTime * Kd * -1 * (gameState["theta"] - gameState["prevTheta"]);

  gameState["alpha"] = gameState["P"] + gameState["I"] + gameState["D"];
}

function draw(timestamp) {
  let deltaTime = timestamp - gameState["prevTime"];
  gameState["prevTime"] = timestamp;

  drawBackground();

  PID_Control(gameState, deltaTime / 1000);

  drawArrow(gameState["theta"]);

  gameState["prevTheta"] = gameState["theta"];
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
