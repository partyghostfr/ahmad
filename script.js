// Attach functions to the window object for global access
window.handleYesClick = handleYesClick;
window.handleNoClick = handleNoClick;

// Ensure DOM is fully loaded before event handlers bind
document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');

    if (yesButton && noButton) {
        noButton.addEventListener('click', handleNoClick);
        yesButton.addEventListener('click', handleYesClick);
    }
});

(async function checkForUpdates() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json");
        if (!response.ok) throw new Error("Failed to fetch version info");

        const data = await response.json();
        if (data.version !== "1.0") {
            alert(data.updateMessage);
        } else {
            console.log("Using the latest version.");
        }
    } catch (error) {
        console.error("Update check failed:", error);
    }
})();

const messages = [
    "Are you sure?", "Really sure??", "Are you positive?", "Pookie please...",
    "Just think about it!", "If you say no, I will be really sad...",
    "I will be very sad...", "I will be very very very sad...",
    "Ok fine, I will stop asking...", "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    const currentSize = parseFloat(getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
