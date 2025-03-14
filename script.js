const inputBtn = document.getElementById('textArea');
const sendBtn = document.getElementById('sendBtn');
const pgTitle = document.getElementById('tiTle');
const chatBox = document.getElementById('chatBox');
let userMessage;
    // Hide/show send button based on input
    inputBtn.addEventListener('input', function () {
        if (inputBtn.value.trim() !== "") {
            sendBtn.style.visibility = 'visible';
            pgTitle.style.display = 'none';
        } else {
            sendBtn.style.visibility = 'hidden';
            pgTitle.style.display = 'block';
        }
    });

    // Create a chat div
    const createChatDv = (message, className) => {
        const createDv = document.createElement('div');
        createDv.classList.add('chat', className);
        let chatContent = `<p>${message}</p>`;
        createDv.innerHTML = chatContent;
        return createDv;
    };
    const generateResponse = (incomingChatDv) => {
        const messageElement = incomingChatDv.querySelector('p');
        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
            const requestOption = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer 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',
                    'HTTP-Referer': 'https://www.sitename.com',
                    'X-Title': 'SiteName',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-r1:free',
                    messages: [{ role: 'user', content: userMessage }],
                }),
            };

            fetch(apiUrl, requestOption)
                .then(res => res.json())
                .then(data => {
                    if (data.choices && data.choices[0].message) {
                        messageElement.innerHTML = data.choices[0].message.content;
                        console.log(data);
                    }
                    else {
                    messageElement.innerHTML = "Oops! No response from the API.";
                    }
                    scrollToBottom();
                })
                .catch((error) => {
                    console.error(error);
                    messageElement.innerHTML = 'Oops! Something went wrong. Please try again.';
                })  
    };
    
const handleChat = () => {
    userMessage = inputBtn.value.trim();
        if (!userMessage) return;
        console.log("User Message:", userMessage)
        // Append user's message to the chat box
        chatBox.appendChild(createChatDv(userMessage, 'outgoing-chat'));

        // Clear the input field
        inputBtn.value = '';
        sendBtn.style.visibility = 'hidden';


        const incomingChatDv = createChatDv('Thinking...', 'incoming-chat');
        chatBox.appendChild(incomingChatDv);

        generateResponse(incomingChatDv);
        scrollToBottom();
};

const scrollToBottom = () => {
    chatBox.scrollTop = chatBox.scrollHeight;
}
    
sendBtn.addEventListener('click', handleChat);
