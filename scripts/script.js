import TaskService from "./task.js";
import ThemeService from "./theme.js";

// *HomePage object - module scaffolding
const HomePage = {};

// Retrieve Tasks from Local Storage or Initialize
HomePage.getTasks = () => {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.error("Error reading tasks from localStorage:", error);
    return [];
  }
};

// Retrieve Theme from Local Storage or Initialize
HomePage.getTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light"; // Default to light mode
  return savedTheme;
};

// new instance of TaskService
const taskService = new TaskService(HomePage.getTasks());
// new instance of ThemeService
const themeService = new ThemeService(HomePage.getTheme());

// *Init function
HomePage.init = () => {
  // Initialize Theme
  themeService.setTheme();
  themeService.themeHandler();

  // Initialize Task
  taskService.displayTasks();
  taskService.formHandler();
};

HomePage.init();
