// Define variables
let score = 0;
let highestScore = 0;
const allColors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "gray", ];
let targetColor;

// Initialize the game
function initGame() {
    score = 0;
    updateScore();
    updateHighestScore();
    newRound();
    document.getElementById("gameOver").style.display = "none";
    document.querySelector(".container").style.display = "block";
}

// Start a new round
function newRound() {
    colors = getRandomColors(6);
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("colorDisplay").style.backgroundColor = targetColor;
    setColorOptions();
}

// Get an array of random colors
function getRandomColors(num) {
    const shuffled = allColors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// Shuffle the colors array
function shuffleColors(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Set color options for the buttons
function setColorOptions() {
    shuffleColors(colors);
    const buttons = document.querySelectorAll(".colorOption");
    buttons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => checkGuess(colors[index]);
    });
}

// Check the player's guess
function checkGuess(color) {
    if (color === targetColor) {
        score++;
        updateScore();
        newRound();
        displayMessage("Correct! Well done.", "correct");
    } else {
        displayMessage("Wrong! Try again.", "incorrect");
        setTimeout(gameOver, 1000);
    }
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Update the highest score display
function updateHighestScore() {
    document.getElementById("highestScore").textContent = `Highest Score: ${highestScore}`;
}

// Display a message to the player
function displayMessage(message, type) {
    const gameStatus = document.getElementById("gameStatus");
    gameStatus.textContent = message;
    gameStatus.className = '';
   gameStatus.classList.add(type);
    gameStatus.style.display = "block";
    gameStatus.classList.add("fade-out");
    setTimeout(() => {
        gameStatus.classList.remove("fade-out") 
        gameStatus.textContent = '';
        gameStatus.style.display = "none";
    }, 1000);
}

// Handle game over state
function gameOver() {
    if (score > highestScore) {
        highestScore = score;
        updateHighestScore();
    }
    displayMessage("Game Over! Your final score is " + score, "black");
    document.querySelector(".container").style.display = "none";
    document.getElementById("gameOver").style.display = "flex";
    document.getElementById("finalScore").textContent = score;
    document.getElementById("newGameButton").style.display = "flex";
    triggerCelebration();
}

// Trigger celebration animation
function triggerCelebration() {
    const gameOverElement = document.getElementById("gameOver");
    gameOverElement.classList.add("celebrate");
    setTimeout(() => {
        gameOverElement.classList.remove("celebrate");
    }, 3000); 
}

// Reset the game
function resetGame() {
    document.querySelector(".container").classList.remove("game-over");
    document.getElementById("gameOver").style.display = "none";
    initGame();
}

// Add event listener to the new game button
document.getElementById("newGameButton").addEventListener("click", resetGame);



// Initialize the game on page load
window.onload = initGame;