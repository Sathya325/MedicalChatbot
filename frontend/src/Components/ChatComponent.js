import React, { useState } from 'react';
import './ChatComponent.css'; // Import the CSS file
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/user/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          { role: 'user', content: inputMessage },
        ]),
      });
      console.log(response)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let messageContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        messageContent += decoder.decode(value);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: inputMessage },
        { role: 'assistant', content: messageContent },
      ]);

    } catch (err) {
      setError('Failed to fetch response');
      console.error(err);
    } finally {
      setLoading(false);
      setInputMessage('');
    }
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} disabled={loading || !inputMessage}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ChatComponent;
