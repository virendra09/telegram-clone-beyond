import React from 'react';
import ChatMessages from './ChatMessages';
import './ChatWindow.css';

const ChatWindow = ({ chat }) => {
  return (
    <div className="chat-window" style={{backgroundImage:"../assets/charbox-background1.png"}}>
      <div className="chat-header">
        <h2>{chat.creator.name}</h2>
        <p>Status: {chat.status}</p>
      </div>
      <ChatMessages chatId={chat.id} />
    </div>
  );
};

export default ChatWindow;



