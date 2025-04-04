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
  countdownInterval = setInterval(function () {
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
  stopwatchInterval = setInterval(function () {
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
  if (customTimeInput && !isNaN(customTimeInput) && customTimeInput > 0) {
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
    currency -= 50;
    storeFeedback.textContent = "You bought a Study Buddy!";
  } else {
    storeFeedback.textContent = "You don't have enough coins to buy a Study Buddy!";
  }
  currencyAmount.textContent = currency;
}

function buyFoodForBuddy() {
  if (currency >= 20) {
    currency -= 20;
    storeFeedback.textContent = "You bought food for your Study Buddy!";
  } else {
    storeFeedback.textContent = "You don't have enough coins to buy food!";
  }
  currencyAmount.textContent = currency;
}

// Default background (in case no custom background is selected)
const defaultBackground = "https://u.cubeupload.com/EclipseMisclick/20250305137Kleki.png";

// Load saved background or apply default if none is saved
let savedBg = localStorage.getItem("customBackground");
if (savedBg) {
  document.body.style.background = `url(${savedBg}) no-repeat center center fixed`;
} else {
  document.body.style.background = `url(${defaultBackground}) no-repeat center center fixed`;
}
document.body.style.backgroundSize = "cover";

// Background switching via upload
function switchBackground() {
  document.getElementById("bgUploadInput").click(); // Trigger hidden file input
}

document.getElementById("bgUploadInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      document.body.style.background = `url(${imageUrl}) no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
      localStorage.setItem("customBackground", imageUrl);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid image.");
  }
});

// To-Do List functionality (Fixed Version)
document.getElementById('addTodoButton').addEventListener('click', function () {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();

  if (todoText) {
    const todoList = document.getElementById('todoList');
    const newTodo = document.createElement('li');

    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = todoText;

    const crossButton = document.createElement('button');
    crossButton.textContent = "✓";
    crossButton.classList.add('crossButton');

    newTodo.appendChild(todoTextSpan);
    newTodo.appendChild(crossButton);
    todoList.appendChild(newTodo);

    crossButton.addEventListener('click', function () {
      todoTextSpan.style.textDecoration = 'line-through';
      newTodo.classList.add('fadeOut');
      setTimeout(() => newTodo.remove(), 1000);
    });

    todoInput.value = '';
  }
});

document.getElementById('todoInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('addTodoButton').click();
  }
});

// Button event listeners
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("startStopwatchButton").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchButton").addEventListener("click", resetStopwatch);
document.getElementById("setCustomTimeButton").addEventListener("click", setCustomTime);
document.getElementById("timerModeButton").addEventListener("click", switchToTimerMode);
document.getElementById("stopwatchModeButton").addEventListener("click", switchToStopwatchMode);
document.getElementById("buyStudyBuddyButton").addEventListener("click", buyStudyBuddy);
document.getElementById("buyFoodButton").addEventListener("click", buyFoodForBuddy);
document.getElementById("switchBgButton").addEventListener("click", switchBackground);

updateTimer();
updateStopwatch();
