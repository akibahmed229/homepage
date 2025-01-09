class TaskService {
  // Initializes tasks from localStorage or provided array
  constructor(tasks) {
    this.tasks = tasks;
  }

  // Sets up form submission handler for adding new tasks
  formHandler() {
    const taskInput = document.getElementById("taskInput");
    const form = document.getElementById("form");

    // Prevents default form behavior and handles task input
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        this.addTask(task); // Adds the task
        taskInput.value = ""; // Clears input field
      } else {
        alert("Please enter a task"); // Alerts if input is empty
      }
    });
  }

  // Adds a task to the list and updates localStorage
  addTask(taskText) {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    this.tasks.push(newTask); // Adds new task to tasks array

    localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Saves to localStorage
    this.displayTasks(); // Updates task display
  }

  // Displays all tasks in the tasks container
  displayTasks() {
    const tasksContainer = document.querySelector(".tasksContainer");
    tasksContainer.innerHTML = ""; // Clears existing tasks

    this.tasks.forEach((task) => {
      // Creates a task element and sets its content
      const taskElement = document.createElement("div");
      taskElement.classList.add("tasks");
      taskElement.innerHTML = `
        <p>${task.text}</p>
        <div>
            <button class="editTask" data-id="${task.id}" aria-label="Edit Task">
                <img src="public/images/edit.svg" alt="Edit Task Icon" width="20" height="20" />
            </button>
            <button class="deleteTask" data-id="${task.id}" aria-label="Delete Task">
                <img src="public/images/delete.svg" alt="Delete Task Icon" width="20" height="20" />
            </button>
        </div>
      `;

      tasksContainer.append(taskElement); // Adds the task to the container
    });

    this.attachTaskEventListeners(); // Attaches edit/delete button events
  }

  // Attaches click events to edit and delete buttons for each task
  attachTaskEventListeners() {
    const editButtons = document.querySelectorAll(".editTask");
    const deleteButtons = document.querySelectorAll(".deleteTask");

    // Adds edit button functionality
    editButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const taskId = e.target.closest("button")?.dataset?.id;
        this.editTask(taskId);
      });
    });

    // Adds delete button functionality
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const taskId = e.target.closest("button")?.dataset?.id;
        this.deleteTask(taskId);
      });
    });
  }

  // Edits a task's text and updates localStorage
  editTask(id) {
    // taskToEdit is not a copy of the object; it’s a reference to the same object in the this.tasks array.
    // When you use find, it doesn't create a copy of the object; it gives you a reference to the actual object in memory.
    const taskToEdit = this.tasks.find((task) => task.id == id);

    if (taskToEdit) {
      const newTaskText = prompt("Edit Your Task:", taskToEdit.text);

      if (newTaskText && newTaskText.trim() !== "") {
        // Modifying taskToEdit.text directly changes the corresponding object inside this.tasks.
        taskToEdit.text = newTaskText; // Updates task text
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Saves updated tasks

        this.displayTasks(); // Refreshes task display
      } else {
        alert("Please enter a task to edit"); // Alerts if input is invalid
      }
    }
  }

  // Deletes a task and updates localStorage
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id != id); // Removes task by ID

    localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Saves updated tasks
    this.displayTasks(); // Refreshes task display
  }
}

export default TaskService;
