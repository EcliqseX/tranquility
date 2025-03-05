let countdownDisplay = document.getElementById("countdown");
let sessionCount = document.getElementById("sessionCount");

let countdownInterval;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let sessions = 0;

function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  countdownInterval = setInterval(function() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimer();
    } else {
      clearInterval(countdownInterval);
      alert("Time's up! Great work!");
      sessions++;
      sessionCount.textContent = sessions;
      timeRemaining = 25 * 60; // Reset to 25 minutes
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60;
  updateTimer();
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);

// Initial Timer Display
updateTimer();
