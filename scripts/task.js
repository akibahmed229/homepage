class TaskService {
  // Constructor to initialize tasks array from localStorage
  constructor(tasks) {
    this.tasks = tasks;
  }

  // Form Submit Event Handler
  formHandler() {
    const taskInput = document.getElementById("taskInput");
    const form = document.getElementById("form");

    // Form Submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        this.addTask(task);
        taskInput.value = "";
      } else {
        alert("Please enter a task");
      }
    });
  }

  // Add Task
  addTask(taskText) {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    this.tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.displayTasks(); // Refresh task display
  }

  // Display Tasks
  displayTasks() {
    const tasksContainer = document.querySelector(".tasksContainer"); // querySelector to get a single element
    tasksContainer.innerHTML = ""; // Clear the container first to avoid duplication

    this.tasks.forEach((task) => {
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

      tasksContainer.append(taskElement); // Append task to the container
    });

    this.attachTaskEventListeners(); // Add event listeners for edit and delete
  }

  // Attach Event Listeners to Task Buttons
  attachTaskEventListeners() {
    const editButtons = document.querySelectorAll(".editTask");
    const deleteButtons = document.querySelectorAll(".deleteTask");

    editButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const taskId = e.target.closest("button")?.dataset?.id;
        this.editTask(taskId);
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const taskId = e.target.closest("button")?.dataset?.id;
        this.deleteTask(taskId);
      });
    });
  }

  // Edit Task
  editTask(id) {
    const taskToEdit = this.tasks.find((task) => task.id == id);

    if (taskToEdit) {
      const newTaskText = prompt("Edit Your Task:", taskToEdit.text);

      if (newTaskText && newTaskText.trim() !== "") {
        taskToEdit.text = newTaskText; // Update task Text
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.displayTasks(); // Refresh task display
      } else {
        alert("Please enter a task to edit");
      }
    }
  }

  // Delete Task
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id != id);

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.displayTasks(); // Refresh task display
  }
}

export default TaskService;
