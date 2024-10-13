document.addEventListener("DOMContentLoaded", function () {
    
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        let taskText = taskInput.value.trim();

        if(taskText === ""){
            alert("Enter a task");
        }
        else{
            // Create new list item (li) and remove button
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
    
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // Event listener for removing task
            removeButton.onclick = function () {
                taskList.removeChild(listItem);
            };

            // Append remove button and list item to task list
            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);

            // Clear input field after task is added
            taskInput.value = '';
        }
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key press in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
})
