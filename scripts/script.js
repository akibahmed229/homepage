/**
 * Main Script for HomePage
 * Initializes and orchestrates task and theme management using TaskService and ThemeService.
 *
 * Modules:
 * - TaskService: Manages tasks (add, edit, delete, display).
 * - ThemeService: Manages light/dark theme toggling and persistence.
 *
 * HomePage Object:
 * - getTasks(): Retrieves tasks from localStorage or initializes an empty array.
 * - getTheme(): Retrieves the saved theme from localStorage or defaults to "light".
 * - init(): Main initialization function to set up TaskService and ThemeService.
 *
 * Initialization Steps:
 * 1. Retrieve tasks and theme from localStorage.
 * 2. Instantiate TaskService and ThemeService with retrieved data.
 * 3. Initialize and set the theme using ThemeService.
 * 4. Display existing tasks and set up task form handling using TaskService.
 */

import TaskService from "./services/task.js";
import ThemeService from "./services/theme.js";

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
  try {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to light mode
    return savedTheme;
  } catch (error) {
    console.error("Error readin theme from localStorage:", error);
    return "light";
  }
};

// *Init function
HomePage.init = () => {
  // new instance of TaskService
  const taskService = new TaskService(HomePage.getTasks());
  // new instance of ThemeService
  const themeService = new ThemeService(HomePage.getTheme());

  // Initialize Theme
  themeService.setTheme();
  themeService.themeHandler();

  // Initialize Task
  taskService.displayTasks();
  taskService.formHandler();
};

HomePage.init();
