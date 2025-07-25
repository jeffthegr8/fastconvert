document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle"); // Get the toggle button
    const body = document.body; // Select the body

    // Check if dark mode is already enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.checked = true; // Make sure the toggle reflects the current state
    }

    // Add event listener to the toggle button
    toggleButton.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled"); // Save the preference
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        }
    );
});
