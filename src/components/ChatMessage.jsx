import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.role}`}>
      <p>{message.content}</p>
    </div>
  );
}

export default ChatMessage;
