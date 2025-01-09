class ThemeService {
  // Initialize Theme on Page Load
  constructor(theme) {
    this.theme = theme;
    this.body = document.body;
  }

  // Function to Set Theme
  setTheme(theme = this.theme) {
    const toggleThemeIcon = document.getElementById("toggleThemeIcon");

    if (theme === "dark") {
      this.body.classList.add("darkMode");
      toggleThemeIcon.src = "./public/images/light-svgrepo-com.svg";
    } else {
      this.body.classList.remove("darkMode");
      toggleThemeIcon.src = "./public/images/dark-svgrepo-com.svg";
    }
    localStorage.setItem("theme", theme); // Save theme in localStorage
  }

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
