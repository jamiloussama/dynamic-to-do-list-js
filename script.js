document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the DOM is fully loaded
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again
    }

    // Function to add a task (with optional saving to Local Storage)
    function addTask(taskText, save = true) {
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create task element (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        li.appendChild(removeBtn);

        // Add the task to the task list (ul)
        taskList.appendChild(li);

        // Save task to Local Storage if 'save' is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated task list
        }

        // Clear the input field
        taskInput.value = '';

        // Remove task when remove button is clicked
        removeBtn.addEventListener('click', function () {
            removeTask(taskText, li);
        });
    }

    // Function to remove a task and update Local Storage
    function removeTask(taskText, taskElement) {
        // Remove the task from the DOM
        taskElement.remove();

        // Remove the task from Local Storage
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove task from array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated list
    }

    // Event listener to add task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Add task and save to Local Storage
    });

    // Event listener to add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText); // Add task and save to Local Storage
        }
    });
});
