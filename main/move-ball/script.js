const ball = document.getElementById("ball");
const dot = document.getElementById("dot");
const container = document.querySelector(".container");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const playPauseButton = document.getElementById("play-pause-button");
const resetButton = document.getElementById("reset-button");

let moveIntervalTime = 100;
let moveInterval;
let ballX = container.clientWidth / 2 - ball.clientWidth / 2;
let ballY = container.clientHeight / 2 - ball.clientHeight / 2;
const step = 10;
let score = 0;
let speed = 10000;
let direction = { x: 0, y: 0 };
let dotInterval;
let isMoving = false;

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

    updateSpeed();
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
    case " ":
      onClickPlayPauseButton();
      break;
  }
});

const onClickPlayPauseButton = () => {
  if (!isMoving) {
    isMoving = true;
    ball.style.filter = "blur(1.4px)";
    moveInterval = setInterval(moveBall, moveIntervalTime);
    playPauseButton.innerHTML = `<img src="icons/pause.svg" alt="Pause" />`;
    direction = { x: 1, y: 0 };
  } else {
    isMoving = false;
    ball.style.filter = "blur(0px)";
    clearInterval(moveInterval);
    playPauseButton.innerHTML = `<img src="icons/play.svg" alt="Play" />`;
  }
};

playPauseButton.addEventListener("click", onClickPlayPauseButton);

resetButton.addEventListener("click", () => {
  isMoving = false;
  clearInterval(moveInterval);
  clearInterval(dotInterval);

  score = 0;
  speed = 10000;
  moveIntervalTime = 100;
  direction = { x: 0, y: 0 };

  scoreDisplay.textContent = score;
  ballX = container.clientWidth / 2 - ball.clientWidth / 2;
  ballY = container.clientHeight / 2 - ball.clientHeight / 2;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  ball.style.filter = "blur(0px)";

  moveDot();
  dotInterval = setInterval(moveDot, speed);
});

function updateSpeed() {
  moveIntervalTime = Math.max(20, moveIntervalTime - 5);
  clearInterval(moveInterval);
  moveInterval = setInterval(moveBall, moveIntervalTime);
}

moveDot();
dotInterval = setInterval(moveDot, speed);
