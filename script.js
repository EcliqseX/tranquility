let countdownDisplay = document.getElementById("countdown");
let sessionCount = document.getElementById("sessionCount");
let currencyAmount = document.getElementById("currencyAmount");

let countdownInterval;
let timeRemaining = 25 * 60; // Default: 25 minutes in seconds
let sessions = 0;
let currency = 0; // User's currency

// Update the timer and also update the tab title
function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  // Update the document title with the remaining time
  document.title = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start the timer
function startTimer() {
  countdownInterval = setInterval(function() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimer();
    } else {
      clearInterval(countdownInterval);
      alert("Time's up! Great work!");
      sessions++;
      currency += 5; // Earn 5 coins per study session
      sessionCount.textContent = sessions;
      currencyAmount.textContent = currency;
      timeRemaining = 25 * 60; // Reset to default 25 minutes
    }
  }, 1000);
}

// Reset the timer
function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60; // Reset to default 25 minutes
  updateTimer();
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);

// Initial Timer Display
updateTimer();
