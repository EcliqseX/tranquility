let countdownDisplay = document.getElementById("countdown");
let sessionCount = document.getElementById("sessionCount");

let countdownInterval;
let timeRemaining = 25 * 60; // Default: 25 minutes in seconds
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
      timeRemaining = 25 * 60; // Reset to default 25 minutes
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60; // Reset to default 25 minutes
  updateTimer();
}

function setCustomTime() {
  let customTimeInput = document.getElementById("customTimeInput").value;
  if (customTimeInput && customTimeInput > 0) {
    timeRemaining = customTimeInput * 60; // Convert minutes to seconds
    updateTimer();
  } else {
    alert("Please enter a valid time.");
  }
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("setCustomTimeButton").addEventListener("click", setCustomTime);

// Initial Timer Display
updateTimer();
