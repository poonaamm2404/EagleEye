document.addEventListener('DOMContentLoaded', () => {
  const chatToggle = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  let isChatOpen = false;

  function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWindow.style.display = isChatOpen ? 'flex' : 'none';
    if (isChatOpen) {
      chatInput.focus();
    }
  }

  chatToggle.addEventListener('click', toggleChat);
  closeChat.addEventListener('click', toggleChat);

  function appendMessage(sender, text, isLoading = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender === 'user' ? 'message-user' : 'message-bot');
    
    if (isLoading) {
      msgDiv.classList.add('typing-indicator');
      msgDiv.innerHTML = '<span></span><span></span><span></span>';
      msgDiv.id = 'typing-indicator';
    } else {
      if (sender === 'bot') {
        msgDiv.innerHTML = window.marked ? marked.parse(text) : text;
      } else {
        msgDiv.textContent = text;
      }
    }
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Display user message
    appendMessage('user', message);
    chatInput.value = '';

    // Show loading
    appendMessage('bot', '', true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      removeTypingIndicator();
      
      if (response.ok) {
        appendMessage('bot', data.reply);
      } else if (response.status === 429) {
        appendMessage('bot', data.message);
        chatInput.disabled = true;
        chatInput.placeholder = "Daily limit reached. Please try tomorrow.";
        const submitBtn = chatForm.querySelector('button');
        if (submitBtn) submitBtn.disabled = true;
      } else {
        appendMessage('bot', 'Error: ' + (data.message || 'Could not reach server.'));
      }
    } catch (error) {
      removeTypingIndicator();
      appendMessage('bot', 'Sorry, I am currently offline. Please contact us via the form.');
      console.error('Chat error:', error);
    }
  });
});
