// Timer Setup
let countdownDisplay = document.getElementById("countdown");
let sessionCount = document.getElementById("sessionCount");
let currencyAmount = document.getElementById("currencyAmount");

let countdownInterval;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let currency = 0; // User's currency

// Update the timer display
function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.title = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start the Timer
function startTimer() {
  countdownInterval = setInterval(function() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimer();
    } else {
      clearInterval(countdownInterval);
      alert("Time's up! Great work!");
      currency += 5; // Earn 5 coins per session
      currencyAmount.textContent = currency;
      timeRemaining = 25 * 60; // Reset to default time
    }
  }, 1000);
}

// Reset Timer
function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60; // Reset to default time
  updateTimer();
}

// Stop Timer
function stopTimer() {
  clearInterval(countdownInterval);
}

// Event Listeners
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);

// Handle Background Upload
document.getElementById("uploadBackground").addEventListener("change", function(event) {
  const reader = new FileReader();
  reader.onload = function() {
    document.body.style.backgroundImage = `url(${reader.result})`;
  };
  reader.readAsDataURL(event.target.files[0]);
});

// Handle Color Picker
document.getElementById("colorPicker").addEventListener("input", function(event) {
  document.body.style.backgroundColor = event.target.value;
});

// Custom Button Images (Example)
document.getElementById("startButton").style.backgroundImage = "url('path/to/custom-start-button.png')";
document.getElementById("resetButton").style.backgroundImage = "url('path/to/custom-reset-button.png')";
document.getElementById("stopButton").style.backgroundImage = "url('path/to/custom-stop-button.png')";
