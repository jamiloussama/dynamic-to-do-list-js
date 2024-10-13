document.addEventListener("DOMContentLoaded", function () {

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Retrieve tasks from Local Storage
    storedTasks.forEach((taskText) => addTask(taskText, false)); // Add each task to the DOM without saving again
  }
    // Ensure tasks are loaded when the DOM content is fully loaded

  loadTasks();

  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Enter a task");
    } else {
      // Create new list item (li) and remove button
      const listItem = document.createElement("li");
      listItem.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");

      // Event listener for removing task
      removeButton.onclick = function () {
        taskList.removeChild(listItem);
        // Remove the task from Local Storage
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter((task) => task !== taskText); // Remove task from array
        localStorage.setItem("tasks", JSON.stringify(storedTasks)); // Save updated list
      };

      // Append remove button and list item to task list
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);

      // Save task to Local Storage if 'save' is true
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks)); // Save updated task list
      }

      // Clear input field after task is added
      taskInput.value = "";
    }
  }


  // Event listener for Add Task button
  addButton.addEventListener("click", addTask);

  // Event listener for Enter key press in input field
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
})
