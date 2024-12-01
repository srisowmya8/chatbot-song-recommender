document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user's message
    addMessage(userInput, "user");

    // Send the input to the backend
    fetch("https://127.0.0.1:5000/get-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
    })
        .then(response => response.json())
        .then(data => {
            // Display the chatbot's response
            addMessage(data.recommendations.join("<br>"), "bot");
        });

    document.getElementById("user-input").value = ""; // Clear input
});

function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("div");
    message.className = sender === "user" ? "user-message" : "bot-message";
    message.innerHTML = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to latest message
}
