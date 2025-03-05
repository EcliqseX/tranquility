let countdownDisplay = document.getElementById("countdown");
let stopwatchDisplay = document.getElementById("stopwatchDisplay");
let sessionCount = document.getElementById("sessionCount");
let currencyAmount = document.getElementById("currencyAmount");
let storeFeedback = document.getElementById("storeFeedback");

let countdownInterval;
let stopwatchInterval;
let timeRemaining = 25 * 60; // Default: 25 minutes in seconds
let stopwatchTime = 0; // Stopwatch starts at 0
let sessions = 0;
let currency = 0; // User's currency

function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateStopwatch() {
  let minutes = Math.floor(stopwatchTime / 60);
  let seconds = stopwatchTime % 60;
  stopwatchDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
      currency += 5; // Earn 5 coins per study session
      sessionCount.textContent = sessions;
      currencyAmount.textContent = currency;
      timeRemaining = 25 * 60; // Reset to default 25 minutes
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60; // Reset to default 25 minutes
  updateTimer();
}

function startStopwatch() {
  stopwatchInterval = setInterval(function() {
    stopwatchTime++;
    updateStopwatch();
  }, 1000);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatch();
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

function switchToTimerMode() {
  document.getElementById("timer").style.display = "block";
  document.getElementById("stopwatch").style.display = "none";
}

function switchToStopwatchMode() {
  document.getElementById("stopwatch").style.display = "block";
  document.getElementById("timer").style.display = "none";
}

// Currency purchase functions
function buyStudyBuddy() {
  if (currency >= 50) {
    currency -= 50; // Deduct the coins for buying a study buddy
    storeFeedback.textContent = "You bought a Study Buddy!";
  } else {
    storeFeedback.textContent = "You don't have enough coins to buy a Study Buddy!";
  }
  currencyAmount.textContent = currency;
}

function buyFoodForBuddy() {
  if (currency >= 20) {
    currency -= 20; // Deduct the coins for buying food
    storeFeedback.textContent = "You bought food for your Study Buddy!";
  } else {
    storeFeedback.textContent = "You don't have enough coins to buy food!";
  }
  currencyAmount.textContent = currency;
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("startStopwatchButton").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchButton").addEventListener("click", resetStopwatch);
document.getElementById("setCustomTimeButton").addEventListener("click", setCustomTime);

document.getElementById("timerModeButton").addEventListener("click", switchToTimerMode);
// Set default background image when the page loads
document.body.style.backgroundImage = "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJ0MXA5dHdobnM3a2gzejQ5cnAzZzllZ2V3ZDFtbWEzb3VhdzdqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/STThM1tDfstfLjM1qd/giphy.gif')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";

document.getElementById("stopwatchModeButton").addEventListener("click", switchToStopwatchMode);

// Store purchase buttons
document.getElementById("buyStudyBuddyButton").addEventListener("click", buyStudyBuddy);
document.getElementById("buyFoodButton").addEventListener("click", buyFoodForBuddy);

// Initial Timer Display
updateTimer();
updateStopwatch();
