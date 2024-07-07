import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import './ChatWindow.css';
import useSession from '../hooks/useSession';

function ChatWindow() {
  const sessionId = useSession();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('http://localhost:7865/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId, userId: 'user46', message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'bot', content: 'Error: Unable to get a response from the bot.' };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='chat-window'>
      <div className='chat-window-header'>
        <h2>Chat</h2>
      </div>
      <div className='chat-window-body'>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className='chat-window-footer'>
        <input
          type='text'
          placeholder='Type a message...'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
