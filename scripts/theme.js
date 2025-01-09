class ThemeService {
  // Initialize Theme on Page Load
  constructor(theme) {
    this.theme = theme;
  }

  // Function to Set Theme
  setTheme(theme = this.theme) {
    const toggleThemeIcon = document.getElementById("toggleThemeIcon");
    const body = document.body;

    if (theme === "dark") {
      body.classList.add("darkMode");
      toggleThemeIcon.src = "./public/images/light-svgrepo-com.svg";
    } else {
      body.classList.remove("darkMode");
      toggleThemeIcon.src = "./public/images/dark-svgrepo-com.svg";
    }
    localStorage.setItem("theme", theme); // Save theme in localStorage
  }

  themeHandler() {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const body = document.body;

    // Event Listener for Theme Toggle
    toggleThemeButton.addEventListener("click", () => {
      const currentTheme = body.classList.contains("darkMode")
        ? "dark"
        : "light";
      this.setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }
}

export default ThemeService;
