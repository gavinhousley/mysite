const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let loopRunning = false;

const paddleHeight = 10;
const paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let touchX = null;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 5;
let dy = -5;

const ballRadius = 10;
let interval = 0;
let score = 0;
let lives = 3;
let gameState = "start";

const brickRowCount = 7;
const brickColumnCount = 7;
const brickWidth = 40;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft = 30;

let bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let lastTime = 0;

function gameLoop(timestamp) {
  if (!loopRunning) return;

  if (!lastTime) lastTime = timestamp;
  let delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(delta);
  draw();

  requestAnimationFrame(gameLoop);
}

function update(delta) {
  if (gameState !== "playing") return;

  const speedScale = 60;

  // ball movement
  x += dx * delta * speedScale;
  y += dy * delta * speedScale;

  // keyboard paddle
  if (rightPressed) {
    paddleX = Math.min(
      paddleX + 7 * delta * speedScale,
      canvas.width - paddleWidth,
    );
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7 * delta * speedScale, 0);
  }

  // mobile paddle
  if (touchX !== null) {
    paddleX = touchX - paddleWidth / 2;
  }

  collisionDetection();
  handleWalls();
}

function handleWalls() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (
      y + dy > canvas.height - paddleHeight - ballRadius &&
      x > paddleX &&
      x < paddleX + paddleWidth
    ) {
      let relativeHit = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
      dx = relativeHit * 7; // tweak for angles

      dy = -Math.abs(dy);
    } else {
      lives--;
      if (!lives) {
        gameState = "gameover";
        loopRunning = false;
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 5;
        dy = -5;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        b.x = brickX;
        b.y = brickY;

        ctx.font = "16px Futura";
        ctx.fillStyle = "#000000";
        ctx.fillText("HATE", brickX, brickY);
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score += 10;
          if (score / 10 === brickRowCount * brickColumnCount) {
            gameState = "gameComplete";
            loopRunning = false;
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Futura";
  ctx.fillStyle = "#000000";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = "16px Futura";
  ctx.fillStyle = "#000000";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.font = "20px Futura";
  ctx.fillStyle = "#000000";
  ctx.fillText(
    `LOVE`,
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight,
  );
}

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "32px Futura";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText("LOVE vs HATE", canvas.width / 2, canvas.height / 2 - 40);

  ctx.font = "20px Futura";
  ctx.fillText(
    "Tap or Click to Begin",
    canvas.width / 2,
    canvas.height / 2 + 10,
  );
}

function drawGameOverScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "32px Futura";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

  ctx.font = "20px Futura";
  ctx.fillText(
    "The haters have won, for now...",
    canvas.width / 2,
    canvas.height / 2,
  );
  ctx.fillText(
    "Tap or Click to Restart",
    canvas.width / 2,
    canvas.height / 2 + 40,
  );
}

function drawGameCompleteScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "32px Futura";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText("YOU WIN !!!", canvas.width / 2, canvas.height / 2 - 40);

  ctx.font = "20px Futura";
  ctx.fillText(
    "The love is strong in you, young master",
    canvas.width / 2,
    canvas.height / 2,
  );
  ctx.fillText(
    "Tap or Click to Restart",
    canvas.width / 2,
    canvas.height / 2 + 40,
  );
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
    return;
  }
  if (gameState === "gameover") {
    drawGameOverScreen();
    return;
  }
  if (gameState === "gameComplete") {
    drawGameCompleteScreen();
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);

document.addEventListener("touchstart", handleTouchMove);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", () => (touchX = null));

function handleTouchMove(e) {
  const touch = e.touches[0];
  touchX = touch.clientX - canvas.offsetLeft;
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

canvas.addEventListener("click", () => {
  if (gameState === "start") {
    gameState = "playing";
    lastTime = 0;
    if (!loopRunning) {
      loopRunning = true;
      requestAnimationFrame(gameLoop);
    }
  } else if (gameState === "gameover" || gameState === "gameComplete") {
    resetGame();
    gameState = "playing";
    lastTime = 0;
    if (!loopRunning) {
      loopRunning = true;
      requestAnimationFrame(gameLoop);
    }
  }
});

function resetGame() {
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 5;
  dy = -5;
  paddleX = (canvas.width - paddleWidth) / 2;
  lives = 3;
  score = 0;
  lastTime = 0;

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r].status = 1;
    }
  }
}

draw();
