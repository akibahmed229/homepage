/**
 * ThemeService Class
 * Handles theme initialization, switching, and persistence.
 *
 * Methods:
 * - constructor(theme): Initializes the ThemeService with the specified theme.
 * - setTheme(theme): Applies the selected theme (dark or light) to the page and updates localStorage.
 * - themeHandler(): Adds a click event listener to the theme toggle button to switch themes dynamically.
 *
 * Usage:
 * 1. Instantiate ThemeService with the desired theme.
 * 2. Call setTheme() to apply the theme or themeHandler() to enable dynamic toggling.
 */

class ThemeService {
  // Initialize Theme on Page Load
  constructor(theme) {
    this.theme = theme;
    this.body = document.body;
  }

  // Function to Change input color
  setInputTextColor(theme = this.theme) {
    const taskInput = document.querySelector("#taskInput");

    if (theme === "dark") {
      taskInput.style.color = "white";
    } else {
      taskInput.style.color = "black";
    }
  }

  // Function to Set Theme
  setTheme(theme = this.theme) {
    const toggleThemeIcon = document.getElementById("toggleThemeIcon");

    // Apply Theme to Page and Update Icon Image Source Accordingly
    if (theme === "dark") {
      this.body.classList.add("darkMode");
      toggleThemeIcon.src = "./public/images/light-svgrepo-com.svg";
    } else {
      this.body.classList.remove("darkMode");
      toggleThemeIcon.src = "./public/images/dark-svgrepo-com.svg";
    }

    localStorage.setItem("theme", theme); // Save theme in localStorage
    this.setInputTextColor(theme);
  }

  // Function to Handle Theme Toggle
  themeHandler() {
    const toggleThemeButton = document.getElementById("toggleTheme");

    // Event Listener for Theme Toggle
    toggleThemeButton.addEventListener("click", () => {
      const currentTheme = this.body.classList.contains("darkMode")
        ? "dark"
        : "light";
      this.setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }
}

export default ThemeService;
