// Function to load tasks from Local Storage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  storedTasks.forEach((taskText) => addTask(taskText, false)); // Load tasks without saving again
}

// Function to add a task (with optional saving to Local Storage)
function addTask(taskText, save = true) {
  if (taskText.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  // Create task element (li)
  const li = document.createElement("li");
  li.textContent = taskText;

  // Create remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  li.appendChild(removeBtn);

  // Add the task to the task list (ul)
  document.getElementById("task-list").appendChild(li);

  // Save task to Local Storage if 'save' is true
  if (save) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks)); // Save updated task list
  }

  // Clear the input field
  document.getElementById("task-input").value = "";

  // Remove task when remove button is clicked
  removeBtn.addEventListener("click", function () {
    removeTask(taskText, li);
  });
}

// Function to remove a task and update Local Storage
function removeTask(taskText, taskElement) {
  // Remove the task from the DOM
  taskElement.remove();

  // Remove the task from Local Storage
  let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  storedTasks = storedTasks.filter((task) => task !== taskText); // Remove task from array
  localStorage.setItem("tasks", JSON.stringify(storedTasks)); // Save updated list
}

// Event listener to add task on button click
document.getElementById("add-task-btn").addEventListener("click", () => {
  const taskText = document.getElementById("task-input").value;
  addTask(taskText); // Add task and save to Local Storage
});

// Event listener to add task on Enter key press
document.getElementById("task-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const taskText = document.getElementById("task-input").value;
    addTask(taskText); // Add task and save to Local Storage
  }
});

// Load tasks from Local Storage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});
