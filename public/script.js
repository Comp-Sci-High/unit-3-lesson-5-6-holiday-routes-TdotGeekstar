window.onload = () => {

const reindeer = document.getElementById("reindeer");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const errorMessage = document.getElementById("errorMessage");
const gameWrapper = document.getElementById("gameWrapper");

let isJumping = false;
let gameOver = false;
let invincible = false;
let score = 0;

// 404 → game transition
setTimeout(() => {
  errorMessage.style.display = "none";
  gameWrapper.classList.remove("hidden");
  startGame();
}, 2000);

// Jump
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !isJumping && !gameOver) jump();
});

document.addEventListener("click", () => {
  if (!isJumping && !gameOver) jump();
});

function jump() {
  isJumping = true;
  reindeer.classList.add("jump");

  const startLeft = 80;  // original horizontal position
  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    // Horizontal arc: move forward then back
    reindeer.style.left = startLeft + Math.sin((progress / 60) * Math.PI) * 40 + "px";
    if (progress > 60) {
      clearInterval(interval);
      reindeer.style.left = startLeft + "px";
    }
  }, 10);

  setTimeout(() => {
    reindeer.classList.remove("jump");
    isJumping = false;
  }, 600);
}

// Obstacles + powerups
function createItem() {
  if (gameOver) return;

  const isPower = Math.random() < 0.25;
  const item = document.createElement("div");

  item.className = isPower ? "powerup" : "obstacle";
  item.textContent = isPower ? "🎅" : "⛄";

  game.appendChild(item);
  let x = 600;
  item.style.left = x + "px";

  const move = setInterval(() => {
    x -= 6;
    item.style.left = x + "px";

    const r = reindeer.getBoundingClientRect();
    const i = item.getBoundingClientRect();

    if (r.right > i.left && r.left < i.right && r.bottom > i.top) {
      if (isPower) activateHat();
      else if (!invincible) endGame();
      clearInterval(move);
      item.remove();
    }

    if (x < -40) {
      if (!isPower) scoreEl.textContent = "Score: " + (++score);
      clearInterval(move);
      item.remove();
    }
  }, 30);
}

// Power-up
function activateHat() {
  invincible = true;
  reindeer.classList.add("hat-on");
  setTimeout(() => {
    invincible = false;
    reindeer.classList.remove("hat-on");
  }, 5000);
}

// End game
function endGame() {
  gameOver = true;
  document.body.innerHTML = `
    <h1>❄️ Game Over ❄️</h1>
    <p>404 is still not found.</p>
    <p>Final Score: ${score}</p>
    <p>Refresh to try again.</p>
  `;
}

// Start
function startGame() {
  setInterval(createItem, 1800);
}

// Snowstorm
setInterval(() => {
  const flake = document.createElement("div");
  flake.className = "stormflake";
  flake.textContent = "❄";
  flake.style.left = Math.random() * 100 + "vw";
  flake.style.fontSize = Math.random() * 12 + 8 + "px";
  flake.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.getElementById("snowstorm").appendChild(flake);
  setTimeout(() => flake.remove(), 8000);
}, 150);

};
