
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const startBtn = document.getElementById("startBtn");
    const scoreDisplay = document.getElementById("score");
    const box = 20;
    let score = 0;
    let game;
    let direction = "RIGHT";
    let snake = [];
    let food = {};

    function initGame() {
      score = 0;
      direction = "RIGHT";
      snake = [{ x: 9 * box, y: 10 * box }];
      food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
      };
      scoreDisplay.textContent = "Score: " + score;
      document.addEventListener("keydown", changeDirection);
      game = setInterval(drawGame, 150);
    }

    function changeDirection(event) {
      if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function drawGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "lightgreen";
        ctx.shadowColor = "#0f0";
        ctx.shadowBlur = 10;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = "red";
      ctx.shadowColor = "#f00";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
      ctx.fill();

      let headX = snake[0].x;
      let headY = snake[0].y;

      if (direction === "LEFT") headX -= box;
      if (direction === "RIGHT") headX += box;
      if (direction === "UP") headY -= box;
      if (direction === "DOWN") headY += box;

      if (headX === food.x && headY === food.y) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        food = {
          x: Math.floor(Math.random() * 19 + 1) * box,
          y: Math.floor(Math.random() * 19 + 1) * box
        };
      } else {
        snake.pop();
      }

      const newHead = { x: headX, y: headY };

      if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height ||
        collision(newHead, snake)
      ) {
        clearInterval(game);
        alert("Game Over! Final Score: " + score);
        location.reload();
      }

      snake.unshift(newHead);
    }

    function collision(head, array) {
      for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
          return true;
        }
      }
      return false;
    }

    // Start button logic
    startBtn.addEventListener("click", () => {
      startBtn.style.display = "none";
      canvas.style.display = "block";
      scoreDisplay.style.display = "block";
      initGame();
    });
  