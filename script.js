let countdownDisplay = document.getElementById("countdown");
let stopwatchDisplay = document.getElementById("stopwatchDisplay");
let sessionCount = document.getElementById("sessionCount");

let countdownInterval;
let stopwatchInterval;
let timeRemaining = 25 * 60; // Default: 25 minutes in seconds
let stopwatchTime = 0; // Stopwatch starts at 0
let sessions = 0;

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

// Change background functions
function setDefaultBackground() {
  document.body.style.backgroundColor = "#f0f0f0"; // Set default background color
  document.body.style.backgroundImage = "none"; // Remove any background image
}

function changeBackground() {
  let colorPicker = document.getElementById("colorPicker");
  colorPicker.style.display = "block";
  colorPicker.addEventListener("input", function() {
    document.body.style.backgroundColor = colorPicker.value;
  });
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("startStopwatchButton").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchButton").addEventListener("click", resetStopwatch);
document.getElementById("setCustomTimeButton").addEventListener("click", setCustomTime);

document.getElementById("timerModeButton").addEventListener("click", switchToTimerMode);
document.getElementById("stopwatchModeButton").addEventListener("click", switchToStopwatchMode);

// Background change buttons
document.getElementById("defaultBackgroundButton").addEventListener("click", setDefaultBackground);
document.getElementById("changeBackgroundButton").addEventListener("click", changeBackground);

// Initial Timer Display
updateTimer();
updateStopwatch();
