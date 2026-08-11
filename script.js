// Get HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Get tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// Show tasks when page loads
displayTasks();


// Add Task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let taskText = taskInput.value.trim();

    // Check empty task
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create task
    let task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task
    tasks.push(task);

    // Save task
    saveTasks();

    // Show task
    displayTasks();

    // Clear input
    taskInput.value = "";

});


// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <li class="list-group-item text-center">
                No tasks added yet
            </li>
        `;

        return;
    }

    // Loop through tasks
    tasks.forEach(function(task) {

        // Create list item
        let li = document.createElement("li");

        li.className =
            "list-group-item d-flex justify-content-between align-items-center";


        // Create left section
        let leftSide = document.createElement("div");

        leftSide.className = "d-flex align-items-center";


        // Create checkbox
        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "form-check-input me-2";

        checkbox.checked = task.completed;


        // Checkbox click
        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Create task text
        let text = document.createElement("span");

        text.textContent = task.text;


        // If completed
        if (task.completed) {

            text.style.textDecoration = "line-through";

            text.style.color = "gray";

        }


        // Add checkbox and text
        leftSide.appendChild(checkbox);

        leftSide.appendChild(text);


        // Create Delete button
        
let deleteButton = document.createElement("button");

deleteButton.className = "btn btn-danger btn-sm";

deleteButton.innerHTML = '<i class="fa-solid fa-rectangle-xmark"></i>';

deleteButton.title = "Delete Task";


// Delete button click
deleteButton.addEventListener("click", function() {

    deleteTask(task.id);

});


        // Add everything to list
        li.appendChild(leftSide);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

}


// Delete Task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    displayTasks();

}


// Save Tasks
function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );

}