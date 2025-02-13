const ball = document.getElementById("ball");
const dot = document.getElementById("dot");
const container = document.querySelector(".container");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

let ballX = container.clientWidth / 2 - ball.clientWidth / 2;
let ballY = container.clientHeight / 2 - ball.clientHeight / 2;
const step = 10;
let score = 0;
let speed = 10000;
let direction = { x: 0, y: 0 };

let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;
highScoreDisplay.textContent = highScore;

function moveDot() {
  const maxX = container.clientWidth - dot.clientWidth;
  const maxY = container.clientHeight - dot.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  dot.style.left = `${randomX}px`;
  dot.style.top = `${randomY}px`;
}

function checkCollision() {
  const ballRect = ball.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();

  if (
    ballRect.left < dotRect.right &&
    ballRect.right > dotRect.left &&
    ballRect.top < dotRect.bottom &&
    ballRect.bottom > dotRect.top
  ) {
    score++;
    scoreDisplay.textContent = score;
    speed = Math.max(500, speed - 200);

    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem("highScore", highScore);
    }

    moveDot();
    clearInterval(dotInterval);
    dotInterval = setInterval(moveDot, speed);
  }
}

function moveBall() {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const ballWidth = ball.clientWidth;
  const ballHeight = ball.clientHeight;

  ballX += direction.x * step;
  ballY += direction.y * step;

  if (ballX < -ballWidth) ballX = containerWidth;
  if (ballX > containerWidth) ballX = -ballWidth;
  if (ballY < -ballHeight) ballY = containerHeight;
  if (ballY > containerHeight) ballY = -ballHeight;

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  checkCollision();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
  }
});

setInterval(moveBall, 100);
let dotInterval = setInterval(moveDot, speed);
moveDot();
