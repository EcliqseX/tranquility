// Function to change background image
function changeBackgroundImage() {
  // Get the file input element
  const input = document.getElementById("backgroundImage");
  const file = input.files[0];  // Get the first file

  if (file) {
    const reader = new FileReader();
    
    // When file is loaded, set the background image of the body
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
      document.body.style.backgroundSize = "cover";  // Ensure the image covers the screen
      document.body.style.backgroundPosition = "center";  // Center the image
    }

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
}

// Reset the background to a default color
function resetBackground() {
  document.body.style.backgroundImage = "none";  // Remove any background image
  document.body.style.backgroundColor = "#f5f5f5";  // Set to default background color
}

// Event listener for file input change (when a user uploads a background image)
document.getElementById("backgroundImage").addEventListener("change", changeBackgroundImage);

// Timer and Stopwatch logic (same as before)
let countdownDisplay = document.getElementById("countdown");
let stopwatchDisplay = document.getElementById("stopwatchTime");
let currencyAmount = document.getElementById("currencyAmount");

let countdownInterval;
let stopwatchInterval;

let timeRemaining = 25 * 60; // 25 minutes for Timer (in seconds)
let stopwatchTime = 0; // Stopwatch starts from 0 seconds
let currency = 0; // User's currency

// Function to update the timer display
function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.title = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start Timer
function startTimer() {
  countdownInterval = setInterval(function() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimer();
    } else {
      clearInterval(countdownInterval);
      alert("Time's up! Great work!");
      currency += 5; // Earn 5 coins per study session
      currencyAmount.textContent = currency;
      timeRemaining = 25 * 60; // Reset to 25 minutes
    }
  }, 1000);
}

// Stop Timer
function stopTimer() {
  clearInterval(countdownInterval);
}

// Reset Timer
function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60; // Reset to 25 minutes
  updateTimer();
}

// Start Stopwatch
function startStopwatch() {
  stopwatchInterval = setInterval(function() {
    stopwatchTime++;
    let minutes = Math.floor(stopwatchTime / 60);
    let seconds = stopwatchTime % 60;
    stopwatchDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, 1000);
}

// Stop Stopwatch
function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

// Reset Stopwatch
function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  stopwatchDisplay.textContent = '00:00';
}

// Switch to Timer Mode
function switchToTimer() {
  document.getElementById("stopwatchContainer").style.display = 'none';
  document.getElementById("timerContainer").style.display = 'block';
  resetTimer(); // Reset the timer when switching to timer mode
}

// Switch to Stopwatch Mode
function switchToStopwatch() {
  document.getElementById("stopwatchContainer").style.display = 'block';
  document.getElementById("timerContainer").style.display = 'none';
  resetStopwatch(); // Reset the stopwatch when switching to stopwatch mode
}

// Event Listeners for Timer
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);

// Event Listeners for Stopwatch
document.getElementById("startStopwatchButton").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchButton").addEventListener("click", resetStopwatch);
document.getElementById("stopStopwatchButton").addEventListener("click", stopStopwatch);

// Event Listeners for Mode Switch
document.getElementById("timerMode").addEventListener("click", switchToTimer);
document.getElementById("stopwatchMode").addEventListener("click", switchToStopwatch);

// Initialize Timer Display
updateTimer();
