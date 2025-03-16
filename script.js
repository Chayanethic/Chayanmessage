const sendSound = document.getElementById('sendSound');
        const receiveSound = document.getElementById('receiveSound');
        
        // AI profile picture (Chayan)
        const aiProfilePic = 'https://images.vexels.com/media/users/3/137678/isolated/preview/cd52ed115a2c5a0992d7b23b7b3b0f53-logo-geometric-polygonal-stroke.png'; // Replace with Chayan's image URL

        // Add Enter key support
        document.getElementById('user-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        async function sendMessage() {
            const userInput = document.getElementById('user-input');
            const chatMessages = document.getElementById('chat-messages');

            if (userInput.value.trim() === '') return;

            // Play send sound
            try {
                sendSound.currentTime = 0; // Reset to start
                await sendSound.play();
            } catch (error) {
                console.log('Send sound failed:', error);
            }

            // Display user's message (no profile pic)
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.textContent = userInput.value;
            chatMessages.appendChild(userMessage);

            // Clear input field
            const message = userInput.value;
            userInput.value = '';

            // Display typing effect
            const typingMessage = document.createElement('div');
            typingMessage.className = 'message ai typing';
            typingMessage.textContent = 'SmartQAI is thinking...';
            chatMessages.appendChild(typingMessage);

            // Smooth scroll to bottom
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });

            // Send message to API or simulate AI response
            try {
                let aiResponse;
                if (message.toLowerCase() === 'hi' || message.toLowerCase() === 'hello') {
                    aiResponse = { answer: 'Hello! How can SmartQAI assist you today?' };
                } else {
                    const response = await fetch('https://aimessage.vercel.app/ask', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ question: message })
                    });
                    aiResponse = await response.json();
                }

                // Remove typing effect
                chatMessages.removeChild(typingMessage);

                // Display Chayan's message with profile pic
                const aiMessage = document.createElement('div');
                aiMessage.className = 'message ai';
                const aiImg = document.createElement('img');
                aiImg.className = 'profile-pic';
                aiImg.src = aiProfilePic;
                aiImg.alt = 'Chayan';
                const aiText = document.createElement('span');
                aiText.textContent = aiResponse.answer;
                aiMessage.appendChild(aiImg);
                aiMessage.appendChild(aiText);
                chatMessages.appendChild(aiMessage);

                // Play receive sound
                try {
                    receiveSound.currentTime = 0; // Reset to start
                    await receiveSound.play();
                } catch (error) {
                    console.log('Receive sound failed:', error);
                }

                // Smooth scroll to bottom
                chatMessages.scrollTo({
                    top: chatMessages.scrollHeight,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Error:', error);
                chatMessages.removeChild(typingMessage);
                const errorMessage = document.createElement('div');
                errorMessage.className = 'message ai';
                const aiImg = document.createElement('img');
                aiImg.className = 'profile-pic';
                aiImg.src = aiProfilePic;
                aiImg.alt = 'Chayan';
                const errorText = document.createElement('span');
                errorText.textContent = 'Oops! Chayan encountered an error.';
                errorMessage.appendChild(aiImg);
                errorMessage.appendChild(errorText);
                chatMessages.appendChild(errorMessage);
            }
        }
