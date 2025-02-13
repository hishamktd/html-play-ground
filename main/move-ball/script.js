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

document.addEventListener("keydown", (event) => {
  const containerRect = container.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  switch (event.key) {
    case "ArrowUp":
      if (ballRect.top - 9.7 > containerRect.top) ballY -= step;
      break;
    case "ArrowDown":
      if (ballRect.bottom + 9.7 < containerRect.bottom) ballY += step;
      break;
    case "ArrowLeft":
      if (ballRect.left - 9.7 > containerRect.left) ballX -= step;
      break;
    case "ArrowRight":
      if (ballRect.right + 9.7 < containerRect.right) ballX += step;
      break;
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  checkCollision();
});

let dotInterval = setInterval(moveDot, speed);
moveDot();
