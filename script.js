let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameMode = "CPU"; // "HUMAN" or "CPU"

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    // CPU move
    if (gameMode === "CPU" && gameActive && currentPlayer === "O") {
        setTimeout(cpuMove, 400);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    checkResult();
}

function cpuMove() {
    let emptyCells = board
        .map((value, index) => value === "" ? index : null)
        .filter(index => index !== null);

    if (emptyCells.length === 0) return;

    // Random move (can upgrade to smart AI later)
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");
}

function checkResult() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            statusText.textContent = `Player ${board[a]} wins! 🎉`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a draw 😐";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
}

/* Optional: switch modes */
function setMode(mode) {
    gameMode = mode;
    restartGame();
    statusText.textContent =
        mode === "CPU" ? "You (X) vs CPU (O)" : "Player X's turn";
}
