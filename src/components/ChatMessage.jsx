import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';
import remarkGfm from 'remark-gfm';

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.role}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.content}
      </ReactMarkdown>
    </div>
  );
}

export default ChatMessage;
