const ball = document.getElementById("ball");
const dot = document.getElementById("dot");
const container = document.querySelector(".container");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

let ballX = container.clientWidth / 2 - ball.clientWidth / 2;
let ballY = container.clientHeight / 2 - ball.clientHeight / 2;
const step = 10;
let score = 0;
let speed = 3000; // Initial speed for dot movement

// Load high score from localStorage
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
    speed = Math.max(500, speed - 200); // Increase difficulty

    // Update high score
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem("highScore", highScore);
    }

    moveDot(); // Move dot after collision
    clearInterval(dotInterval);
    dotInterval = setInterval(moveDot, speed);
  }
}

document.addEventListener("keydown", (event) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const ballWidth = ball.clientWidth;
  const ballHeight = ball.clientHeight;

  switch (event.key) {
    case "ArrowUp":
      ballY -= step;
      if (ballY < -ballHeight) ballY = containerHeight;
      break;
    case "ArrowDown":
      ballY += step;
      if (ballY > containerHeight) ballY = -ballHeight;
      break;
    case "ArrowLeft":
      ballX -= step;
      if (ballX < -ballWidth) ballX = containerWidth;
      break;
    case "ArrowRight":
      ballX += step;
      if (ballX > containerWidth) ballX = -ballWidth;
      break;
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  checkCollision();
});

let dotInterval = setInterval(moveDot, speed);
moveDot();
