// Function to add a task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskInput.value;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove");
    removeBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = ""; // Clear input field
}
