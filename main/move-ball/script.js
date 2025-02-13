const ball = document.getElementById("ball");
const container = document.querySelector(".container");

let ballX = container.clientWidth / 2 - ball.clientWidth / 2;
let ballY = container.clientHeight / 2 - ball.clientHeight / 2;
const step = 10;

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
});
