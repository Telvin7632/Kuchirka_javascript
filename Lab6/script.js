document.addEventListener("DOMContentLoaded", () => {
    let puzzles = [], target = [], current = [], initial = [];
    let history = [], lastIndex = -1, moveCount = 0, timerInterval, startTime;
  
    const startScreen  = document.getElementById("start-screen");
    const startBtn     = document.getElementById("start-button");
    const gameEl       = document.getElementById("game");
    const gridEl       = document.getElementById("grid");
    const moveCountEl  = document.getElementById("move-count");
    const minMovesEl   = document.getElementById("min-moves");
    const timerEl      = document.getElementById("timer");
    const newGameBtn   = document.getElementById("new-game");
    const restartBtn   = document.getElementById("restart");
  
    fetch("puzzles.json")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        puzzles = data.puzzles;
        target  = data.target;
      })
      .catch(err => {
        console.error("Не вдалося завантажити puzzles.json:", err);
        alert("Помилка завантаження даних гри. Запустіть локальний сервер.");
      });
  
    startBtn.addEventListener("click", () => {
      startScreen.classList.add("hidden");
      gameEl.classList.remove("hidden");
      setupNewGame();
    });
  
    newGameBtn.addEventListener("click", setupNewGame);
    restartBtn.addEventListener("click", restartGame);
  
    function setupNewGame() {
      if (timerInterval) clearInterval(timerInterval);
  
      let idx;
      do { idx = Math.floor(Math.random() * puzzles.length); }
      while (idx === lastIndex && puzzles.length > 1);
      lastIndex = idx;
  
      initial   = JSON.parse(JSON.stringify(puzzles[idx].matrix));
      current   = JSON.parse(JSON.stringify(initial));
      history   = [ current.flat().join("") ];
      moveCount = 0;
      moveCountEl.textContent = moveCount;
      minMovesEl.textContent  = puzzles[idx].minMoves;
  
      buildGrid();
      startTimer();
    }
  
    function restartGame() {
      clearInterval(timerInterval);
      current   = JSON.parse(JSON.stringify(initial));
      history   = [ current.flat().join("") ];
      moveCount = 0;
      moveCountEl.textContent = moveCount;
      buildGrid();
      startTimer();
    }
  
    function startTimer() {
      startTime = Date.now();
      timerEl.textContent = "00:00";
      timerInterval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        const mm = String(Math.floor(diff / 60)).padStart(2, "0");
        const ss = String(diff % 60).padStart(2, "0");
        timerEl.textContent = `${mm}:${ss}`;
      }, 1000);
    }
  
    function buildGrid() {
      gridEl.innerHTML = "";
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const cell = document.createElement("div");
          cell.className = "cell" + (current[r][c] === 1 ? " on" : "");
          cell.dataset.r = r;
          cell.dataset.c = c;
          cell.addEventListener("click", onCellClick);
          gridEl.appendChild(cell);
        }
      }
    }
  
    function onCellClick(e) {
      const r = +e.target.dataset.r, c = +e.target.dataset.c;
      const prev = current.flat().join("");
      toggle(r, c);
      const post = current.flat().join("");
  
      if (history.length > 1 && post === history[history.length - 2]) {
        history.pop();
        moveCount = Math.max(0, moveCount - 1);
        moveCountEl.textContent = moveCount;
        buildGrid();
        return;
      }
  
      if (post !== prev) {
        history.push(post);
        moveCount++;
        moveCountEl.textContent = moveCount;
        buildGrid();
        checkWin();
      }
    }
  
    function toggle(r, c) {
      [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5) {
          current[nr][nc] ^= 1;
        }
      });
    }
  
    function checkWin() {
      if (current.flat().join("") === target.flat().join("")) {
        clearInterval(timerInterval);
        alert(`Вітаю! Розв’язано за ${moveCount} ходів і ${timerEl.textContent}.`);
      }
    }
  });
  