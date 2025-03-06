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

let isCustomBackground = true; // Track background state

function switchBackground() {
    let body = document.body;

    if (isCustomBackground) {
        // Switch to the custom background image
        body.style.background = "url('https://t3.ftcdn.net/jpg/02/46/55/16/360_F_246551674_iZhrbUtFYFyJeosc2EwUdkTP2MLiE3nm.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
        body.style.animation = "none"; // Stop animation
    }

    isCustomBackground = !isCustomBackground; // Toggle state
}

// To-Do List functionality
document.getElementById('addTodoButton').addEventListener('click', function() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  
  if (todoText) {
    const todoList = document.getElementById('todoList');
    const newTodo = document.createElement('li');
    newTodo.textContent = todoText;

    // Create the "cross out" button
    const crossButton = document.createElement('button');
    crossButton.textContent = "✓";
    crossButton.classList.add('crossButton');
    newTodo.appendChild(crossButton);

    // Add the cross-out functionality
    crossButton.addEventListener('click', function() {
      newTodo.querySelector('span').style.textDecoration = 'line-through'; // Add strikethrough
      newTodo.classList.add('fadeOut'); // Add fade-out animation
      setTimeout(function() {
        newTodo.remove(); // Remove the task after fade-out
      }, 1000); // Duration matches the fade-out animation duration
    });

    // Append new task to the list
    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = todoText;
    newTodo.insertBefore(todoTextSpan, crossButton); // Add text before the cross button

    todoList.appendChild(newTodo);
    todoInput.value = ''; // Clear input after adding
  }
});

// Enable 'Enter' key functionality for To-Do input
document.getElementById('todoInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('addTodoButton').click();
  }
});

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("startStopwatchButton").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchButton").addEventListener("click", resetStopwatch);
document.getElementById("setCustomTimeButton").addEventListener("click", setCustomTime);

document.getElementById("timerModeButton").addEventListener("click", switchToTimerMode);
document.getElementById("stopwatchModeButton").addEventListener("click", switchToStopwatchMode);

// Store purchase buttons
document.getElementById("buyStudyBuddyButton").addEventListener("click", buyStudyBuddy);
document.getElementById("buyFoodButton").addEventListener("click", buyFoodForBuddy);

// ✅ Set default background to custom image
document.body.style.background = "url('https://t3.ftcdn.net/jpg/02/46/55/16/360_F_246551674_iZhrbUtFYFyJeosc2EwUdkTP2MLiE3nm.jpg') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";

// 🎯 Add Event Listener for Background Switch Button
document.getElementById("switchBgButton").addEventListener("click", switchBackground);

// ✅ Initial Timer Display
updateTimer();
updateStopwatch();
