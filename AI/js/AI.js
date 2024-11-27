const apiKey = "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";  
const chatBox = document.getElementById('chat-box');

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    
    addMessage(userInput, 'user');
    document.getElementById("user-input").value = '';  
    
    const messages = [
        {
            role: "system",
            content: "You are an assistant on my website that provides information about jobs."
        },
        {
            role: "user",
            content: userInput
        }
    ];

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 60000
            })
        });

        const data = await response.json();
        console.log("API Response:", data);  

        const aiMessage = data.choices[0].message.content.trim();
        addMessage(aiMessage, 'assistant');
    } catch (error) {
        console.error("Error fetching response:", error);
        addMessage("There was an error connecting to the assistant. Please try again later.", 'assistant');
    }
}

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  
}