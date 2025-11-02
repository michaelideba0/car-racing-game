const gameArea = document.getElementById("gameArea");
const playerCar = document.getElementById("playerCar");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let player = { x: 130, y: 420, speed: 5 };
let enemies = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", moveCar);
restartBtn.addEventListener("click", restartGame);

function moveCar(e) {
  if (gameOver) return;
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < 260) player.x += 20;
  updatePlayerPosition();
}

function updatePlayerPosition() {
  playerCar.style.left = player.x + "px";
}

function spawnEnemy() {
  if (Math.random() < 0.05) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemyCar");
    enemy.style.left = Math.random() * 260 + "px";
    enemy.style.top = "-70px";
    gameArea.appendChild(enemy);
    enemies.push(enemy);
  }
}

function moveEnemies() {
  enemies.forEach((enemy, index) => {
    let y = parseInt(enemy.style.top);
    enemy.style.top = y + 5 + "px";

    if (y > 500) {
      enemy.remove();
      enemies.splice(index, 1);
      score++;
      scoreDisplay.textContent = "Score: " + score;
    }

    if (collision(playerCar, enemy)) {
      endGame();
    }
  });
}

function collision(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function gameLoop() {
  if (gameOver) return;
  spawnEnemy();
  moveEnemies();
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameOver = true;
  alert("💥 Game Over! Final Score: " + score);
}

function restartGame() {
  enemies.forEach(e => e.remove());
  enemies = [];
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = "Score: 0";
  gameLoop();
}

updatePlayerPosition();
gameLoop();