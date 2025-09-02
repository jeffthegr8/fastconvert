document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (!toggleButton) {
        // Silently return if the toggle button is not on the page.
        return;
    }

    const setDarkMode = (enabled) => {
        if (enabled) {
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.checked = true;
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.checked = false;
        }
    };

    // Set initial theme based on saved preference
    const prefersDark = localStorage.getItem("dark-mode") === "enabled";
    setDarkMode(prefersDark);

    // Add event listener to the toggle button
    toggleButton.addEventListener("change", () => {
        setDarkMode(toggleButton.checked);
    });
});
