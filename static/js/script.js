document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user's message
    addMessage(userInput, "user-message");

    // Send the input to the backend
    fetch("/get-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
    })
        .then(response => response.json())
        .then(data => {
            // Display the bot's response
            if (data.recommendations) {
                addMessage(data.recommendations.join("<br>"), "bot-message");
            } else {
                addMessage("Sorry, no recommendations available.", "bot-message");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            addMessage("An error occurred. Please try again later.", "bot-message");
        });

    document.getElementById("user-input").value = ""; // Clear input
});

// Function to add messages to the chat
function addMessage(message, senderClass) {
    const chatBox = document.getElementById("chat");
    const messageElement = document.createElement("p");
    messageElement.classList.add(senderClass);
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
