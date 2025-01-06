// Select Elements
const toggleThemeButton = document.getElementById("toggleTheme");
const toggleThemeIcon = document.getElementById("toggleThemeIcon");
const body = document.body;

// Function to Set Theme
function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("darkMode");
    toggleThemeIcon.src = "./public/images/light-svgrepo-com.svg";
  } else {
    body.classList.remove("darkMode");
    toggleThemeIcon.src = "./public/images/dark-svgrepo-com.svg";
  }
  localStorage.setItem("theme", theme); // Save theme in localStorage
}

// Initialize Theme on Page Load
(function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"; // Default to light mode
  setTheme(savedTheme);
})();

// Event Listener for Theme Toggle
toggleThemeButton.addEventListener("click", () => {
  const currentTheme = body.classList.contains("darkMode") ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});
